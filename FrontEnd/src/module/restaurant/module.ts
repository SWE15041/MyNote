import {Module, register, SagaGenerator, call, Loading, Interval} from "@wonder/core-fe";
import {PublishedRestaurantAJAXWebService} from "service/PublishedRestaurantAJAXWebService";
import {UserAJAXWebService} from "service/UserAJAXWebService";
import {ExtendPauseOrdersDurationAJAXRequest, GetServingInfoAJAXResponse$AvailabilityStatus, UpdatePublishedRestaurantStatusAJAXRequest} from "type/api";
import {RootState} from "type/state";
import {initialState} from "./state";
import {LOADING_UPDATE_RESTAURANT_STATUS, LOADING_INIT_RESTAURANT_DATA, LOADING_TOGGLE_RESTAURANT, RestaurantInfo} from "./type";
import Socket from "utils/socket";
import {StorageKey} from "module/constant";
import moment from "moment-timezone";
import {PAUSE_ORDER_MODAL_CLOSE_BY_RESTAURANT} from "module/login/type";

class RestaurantModule extends Module<RootState, "restaurant"> {
    *getCurrentUser(): SagaGenerator {
        const userInfo = yield* call(UserAJAXWebService.currentUser);
        yield* this.setRestaurantInfo({
            restaurant_name: userInfo.restaurant_name,
            restaurant_id: userInfo.restaurant_id,
            portal_logo_image: userInfo.restaurant_portal_logo_image,
        });

        this.setState({
            userInfo,
        });
    }

    *getUserRestaurants(): SagaGenerator {
        const res = yield* call(UserAJAXWebService.listUserRestaurants);
        this.setState({
            restaurantList: res.restaurants,
        });
    }

    *getMenuList(): SagaGenerator {
        const {restaurantInfo} = this.state;
        if (restaurantInfo?.status === GetServingInfoAJAXResponse$AvailabilityStatus.UNPUBLISHED) {
            this.setState({
                menus: [],
            });
            return;
        }

        const {menus} = yield* call(PublishedRestaurantAJAXWebService.listMenu);
        if (menus.length === 0) {
            return;
        }

        this.setState({
            menus,
        });

        const pathname = window.location.pathname;

        if (pathname.startsWith("/menu")) {
            if (pathname === "/menu") {
                yield* this.pushHistory(`/menu/${menus[0].menu_id}`);
            } else {
                if (pathname.indexOf("menuItem") > -1) return;
                const currentMenuId = pathname.replace("/menu/", "");

                if (menus.findIndex(item => item.menu_id === currentMenuId) !== -1) {
                    yield* this.pushHistory(`/menu/${currentMenuId}`);
                } else {
                    yield* this.pushHistory(`/menu/${menus[0].menu_id}`);
                }
            }
        }
    }

    *closeSocket(): SagaGenerator {
        if (this.state.socket) {
            this.state.socket.close();
            this.setState({socket: null});
        }
    }

    @Loading(LOADING_TOGGLE_RESTAURANT)
    *toggleRestaurant(restaurant_id: string, callback: () => void): SagaGenerator {
        yield* call(UserAJAXWebService.updateUserCurrentRestaurant, {restaurant_id});
        yield* this.resetRestaurant();
        yield* this.pushHistory("/menu");
        yield* this.init();
        callback();
    }

    *setRestaurantInfo(restaurantInfo: RestaurantInfo): SagaGenerator {
        this.setState({restaurantInfo});
    }

    *getServingInfo(): SagaGenerator {
        const {restaurantInfo} = this.state;
        const res = yield* call(PublishedRestaurantAJAXWebService.getServingInfo);
        this.setState({servingInfo: res});

        const currentDay = moment(new Date()).tz("America/New_York").startOf("day").valueOf().toString();
        const servingInfoStorageValue = localStorage.getItem(StorageKey.SERVING_INFO_HAD_BEEN_LOADED_TODAY);
        if (!servingInfoStorageValue || servingInfoStorageValue !== currentDay) {
            localStorage.setItem(StorageKey.SERVING_INFO_HAD_BEEN_LOADED_TODAY, currentDay);
        }

        if (res.availability_status !== GetServingInfoAJAXResponse$AvailabilityStatus.OPEN) {
            this.setState({
                isOutOfServiceTime: false,
            });
        }

        if (res.availability_status !== GetServingInfoAJAXResponse$AvailabilityStatus.PAUSE_ORDERS) {
            localStorage.setItem(PAUSE_ORDER_MODAL_CLOSE_BY_RESTAURANT, "0");
        }

        if (restaurantInfo) {
            yield* this.setRestaurantInfo({...restaurantInfo, status: res.availability_status});
        }
    }

    *resetRestaurant(): SagaGenerator {
        this.setState({...initialState});
        yield* this.closeSocket();
    }

    @Loading(LOADING_INIT_RESTAURANT_DATA)
    *init(): SagaGenerator {
        yield* this.getCurrentUser();
        yield* this.getUserRestaurants();
        yield* this.getServingInfo();
        yield* this.getMenuList();
        yield* this.closeSocket();
        this.setState({
            socket: new Socket(this.state.socketParams),
        });
        this.state.socket && this.state.socket.connect();
    }

    @Loading(LOADING_UPDATE_RESTAURANT_STATUS)
    *updateRestaurantStatus(request: UpdatePublishedRestaurantStatusAJAXRequest): SagaGenerator {
        yield* call(PublishedRestaurantAJAXWebService.update, request);
        yield* this.getServingInfo();
    }

    @Loading(LOADING_UPDATE_RESTAURANT_STATUS)
    *extendPauseOrdersDuration(request: ExtendPauseOrdersDurationAJAXRequest): SagaGenerator {
        yield* call(PublishedRestaurantAJAXWebService.extendPauseOrdersDuration, request);
        yield* this.getServingInfo();
    }

    @Interval(5)
    *onTick(): SagaGenerator {
        if (window.location.pathname !== "/login") {
            const {servingInfo} = this.state;
            const currentDay = moment(new Date()).tz("America/New_York").startOf("day").valueOf().toString();
            const servingInfoStorageValue = localStorage.getItem(StorageKey.SERVING_INFO_HAD_BEEN_LOADED_TODAY);

            if (!servingInfoStorageValue || servingInfoStorageValue !== currentDay) {
                yield* this.getServingInfo();
            } else {
                if (!servingInfo) {
                    return;
                }

                if (servingInfo.availability_status !== GetServingInfoAJAXResponse$AvailabilityStatus.OPEN) {
                    this.setState({
                        isOutOfServiceTime: false,
                    });
                    return;
                }

                if (servingInfo.operating_hour) {
                    const currentTime = moment(new Date()).tz("America/New_York").valueOf();
                    const isInService = !!servingInfo.operating_hour.service_hours.some(({start_time, end_time}) => {
                        return currentTime >= start_time.valueOf() && currentTime <= end_time.valueOf();
                    });
                    this.setState({
                        isOutOfServiceTime: !isInService,
                    });
                } else {
                    this.setState({
                        isOutOfServiceTime: true,
                    });
                }
            }
        }
    }

    *onDestroy(): SagaGenerator {
        yield* this.resetRestaurant();
    }
}

export const module = register(new RestaurantModule("restaurant", initialState));
