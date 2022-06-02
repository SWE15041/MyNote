import {colors} from "colors";
import {GetCurrentUserAJAXResponse, GetServingInfoAJAXResponse, GetServingInfoAJAXResponse$AvailabilityStatus, ImageAJAXView, ListPublishedMenuAJAXResponse$Menu, ListUserRestaurantsAJAXResponse$Restaurant} from "type/api";
import Socket, {SocketOption} from "utils/socket";

export const LOADING_TOGGLE_RESTAURANT = "LOADING_TOGGLE_RESTAURANT";
export const LOADING_UPDATE_RESTAURANT_STATUS = "LOADING_UPDATE_RESTAURANT_STATUS";
export const LOADING_INIT_RESTAURANT_DATA = "LOADING_INIT_RESTAURANT_DATA";

export enum RestaurantAvatarStatus {
    ACTIVE = "OPEN",
    OUT_SERVICE = "OUT_SERVICE",
    CLOSED = "CLOSED",
    INACTIVE = "INACTIVE",
    PAUSE_ORDERS = "PAUSE_ORDERS",
    UNPUBLISHED = "UNPUBLISHED",
    OPEN = "OPEN",
    FORCE_CLOSED = "FORCE_CLOSED",
}

export const RestaurantStatusMap = {
    [RestaurantAvatarStatus.OPEN]: colors.status.open,
    [RestaurantAvatarStatus.CLOSED]: colors.status.closed,
    [RestaurantAvatarStatus.UNPUBLISHED]: colors.status.closed,
    [RestaurantAvatarStatus.INACTIVE]: colors.status.closed,
    [RestaurantAvatarStatus.PAUSE_ORDERS]: colors.status.paused,
    [RestaurantAvatarStatus.OUT_SERVICE]: colors.status.inactive,
    [RestaurantAvatarStatus.FORCE_CLOSED]: colors.status.closedByEnvoy,
};

export const DisplayRestaurantStatus = {
    [GetServingInfoAJAXResponse$AvailabilityStatus.INACTIVE]: "Inactive",
    [GetServingInfoAJAXResponse$AvailabilityStatus.UNPUBLISHED]: "Unpublished",
    [GetServingInfoAJAXResponse$AvailabilityStatus.CLOSED]: "Closed",
    [GetServingInfoAJAXResponse$AvailabilityStatus.OPEN]: "Open",
    [GetServingInfoAJAXResponse$AvailabilityStatus.PAUSE_ORDERS]: "Orders paused",
    [GetServingInfoAJAXResponse$AvailabilityStatus.FORCE_CLOSED]: "Closed by Envoy",
};

export interface RestaurantInfo {
    restaurant_name: string;
    restaurant_id: string;
    portal_logo_image: ImageAJAXView;
    status?: GetServingInfoAJAXResponse$AvailabilityStatus;
}

export interface State {
    restaurantInfo: RestaurantInfo | null;
    servingInfo: GetServingInfoAJAXResponse | null;
    isOutOfServiceTime: boolean;
    socketParams: SocketOption;
    socket: Socket | null;
    menus: ListPublishedMenuAJAXResponse$Menu[];
    userInfo: GetCurrentUserAJAXResponse | null;
    restaurantList: ListUserRestaurantsAJAXResponse$Restaurant[];
}
