import {State} from "@wonder/core-fe";
import {State as MainState} from "module/main/type";
import {State as LoginState} from "module/login/type";
import {State as Forgot} from "module/forgot-password/type";
import {State as NavigationState} from "module/navigation/type";
import {State as SupportState} from "module/support/type";
import {State as MenuState} from "module/menu/type";
import {State as OrderHistoryState} from "module/order-history/type";
import {State as RestaurantStatus} from "module/restaurant/type";
import {State as MenuItemDetailState} from "module/menu-item-detail/type";

export interface RootState extends State {
    app: {
        main: MainState;
        login: LoginState;
        forgot: Forgot;
        navigation: NavigationState;
        support: SupportState;
        menu: MenuState;
        orderHistory: OrderHistoryState;
        restaurant: RestaurantStatus;
        menuItemDetail: MenuItemDetailState;
    };
}
