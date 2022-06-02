import {restaurantActions} from "./../restaurant/index";
import {Module, register, SagaGenerator, call, Loading, put} from "@wonder/core-fe";
import {UserAJAXWebService} from "service/UserAJAXWebService";
import {RootState} from "type/state";
import {initialState} from "./state";
import {LOADING_INIT_GLOBAL_DATA, LOADING_LOGIN, LOADING_LOGOUT} from "./type";
import {message} from "antd";
import {GlobalSettingAJAXWebService} from "service/GlobalSettingAJAXWebService";
import {AlonePagePath} from "../../route";

class MainModule extends Module<RootState, "main"> {
    *getSupportPhone(): SagaGenerator {
        const response = yield* call(GlobalSettingAJAXWebService.getSupportPhoneNumber);
        this.setState({
            supportPhone: response.phone_number,
        });
    }

    *setNavigationBarOpen(navigationBarOpen: boolean): SagaGenerator {
        this.setState({
            navigationBarOpen,
        });
    }

    @Loading(LOADING_INIT_GLOBAL_DATA)
    *init(): SagaGenerator {
        const isAlonePage = AlonePagePath.some(pathName => window.location.pathname.startsWith(pathName));
        if (!isAlonePage) {
            yield* this.getSupportPhone();
            yield put(restaurantActions.init());
        }
    }

    @Loading(LOADING_LOGIN)
    *login(email: string, password: string, callback: (error: any) => void): SagaGenerator {
        try {
            yield* call(UserAJAXWebService.login, {email, password});
            callback(null);
            yield* this.pushHistory(decodeURIComponent(window.location.search.replace("?redirect_url=", "")));
            yield* this.init();
        } catch (error) {
            const {responseData} = error;
            if (!responseData) {
                throw error;
            }
            if (error.responseData && error.responseData.errorCode === "INVALID_EMAIL_OR_PASSWORD") {
                callback(error);
            } else if (responseData.message) {
                message.error(responseData.message);
            } else {
                throw error;
            }
        }
    }

    @Loading(LOADING_LOGOUT)
    *logout(redirect: boolean): SagaGenerator {
        yield* call(UserAJAXWebService.logout);
        yield put(restaurantActions.resetRestaurant());
        if (redirect) {
            yield* this.pushHistory("/login" + "?redirect_url=" + encodeURIComponent(window.location.pathname));
        } else {
            yield* this.pushHistory("/login");
        }

        yield* this.destroyPage();
    }

    *destroyPage(): SagaGenerator {
        this.setState({...initialState});
    }

    *onDestroy(): SagaGenerator {
        yield* this.destroyPage();
    }

    *onEnter(entryComponentProps: any): SagaGenerator {
        yield* this.init();
    }
}

export const module = register(new MainModule("main", initialState));
