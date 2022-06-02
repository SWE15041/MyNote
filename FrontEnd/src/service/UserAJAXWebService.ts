import {UserChangePasswordAJAXRequest, UpdateUserCurrentRestaurantAJAXRequest, GetCurrentUserAJAXResponse, UserLoginAJAXRequest, ListUserRestaurantsAJAXResponse} from "type/api";
import {ajax} from "@wonder/core-fe";

export class UserAJAXWebService {
    static changePassword(request: UserChangePasswordAJAXRequest): Promise<void> {
        return ajax("PUT", "/ajax/user/change-password", {}, request);
    }
    static updateUserCurrentRestaurant(request: UpdateUserCurrentRestaurantAJAXRequest): Promise<void> {
        return ajax("PUT", "/ajax/user/current-restaurant", {}, request);
    }
    static currentUser(): Promise<GetCurrentUserAJAXResponse> {
        return ajax("GET", "/ajax/user/current-user", {}, null);
    }
    static login(request: UserLoginAJAXRequest): Promise<void> {
        return ajax("PUT", "/ajax/user/login", {}, request);
    }
    static logout(): Promise<void> {
        return ajax("GET", "/ajax/user/logout", {}, null);
    }
    static listUserRestaurants(): Promise<ListUserRestaurantsAJAXResponse> {
        return ajax("GET", "/ajax/user/restaurant", {}, null);
    }
}
