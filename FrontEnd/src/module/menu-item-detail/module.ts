import {Module, register, SagaGenerator, Loading, call} from "@wonder/core-fe";
import {initialState} from "./state";
import {PublishedRestaurantAJAXWebService} from "service/PublishedRestaurantAJAXWebService";
import handleAJAXError from "utils/handleAJAXError";
import {RootState} from "type/state";
import {LOADING_MENU_ITEM_DATA} from "./type";

class MenuItemDetailModule extends Module<RootState, "menuItemDetail"> {
    @Loading(LOADING_MENU_ITEM_DATA)
    *getMenuItem(menuItemId: string): SagaGenerator {
        try {
            const res = yield* call(PublishedRestaurantAJAXWebService.getMenuItem, menuItemId);
            this.setState({
                menuItem: res,
            });
        } catch (error) {
            handleAJAXError(error);
        }
    }

    *onLocationMatched(routeParam: {id: string; menuItemId: string}, location: any): SagaGenerator {
        yield* this.getMenuItem(routeParam.menuItemId);
    }

    *onDestroy(): SagaGenerator {
        this.setState({...initialState});
    }
}

export const module = register(new MenuItemDetailModule("menuItemDetail", initialState));
export const actions = module.getActions();
