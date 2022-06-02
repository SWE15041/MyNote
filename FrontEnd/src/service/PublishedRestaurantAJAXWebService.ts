import {UpdatePublishedRestaurantStatusAJAXRequest, GetPrintingSettingsResponse, ExtendPauseOrdersDurationAJAXRequest, ListPublishedMenuAJAXResponse, SearchPublishedMenuItemAJAXRequest, SearchPublishedMenuItemAJAXResponse, PublishedMenuItemAJAXResponse, GetServingInfoAJAXResponse} from "type/api";
import {ajax} from "@wonder/core-fe";

export class PublishedRestaurantAJAXWebService {
    static update(request: UpdatePublishedRestaurantStatusAJAXRequest): Promise<void> {
        return ajax("PUT", "/ajax/published-restaurant", {}, request);
    }
    static getPrintingSettings(restaurantId: string): Promise<GetPrintingSettingsResponse> {
        return ajax("GET", "/ajax/published-restaurant/:restaurantId/printing-setting", {restaurantId}, null);
    }
    static extendPauseOrdersDuration(request: ExtendPauseOrdersDurationAJAXRequest): Promise<void> {
        return ajax("PUT", "/ajax/published-restaurant/extend-pause-orders-duration", {}, request);
    }
    static listMenu(): Promise<ListPublishedMenuAJAXResponse> {
        return ajax("GET", "/ajax/published-restaurant/menu", {}, null);
    }
    static search(request: SearchPublishedMenuItemAJAXRequest): Promise<SearchPublishedMenuItemAJAXResponse> {
        return ajax("PUT", "/ajax/published-restaurant/menu-item", {}, request);
    }
    static getMenuItem(menuItemId: string): Promise<PublishedMenuItemAJAXResponse> {
        return ajax("GET", "/ajax/published-restaurant/menu-item/:menuItemId", {menuItemId}, null);
    }
    static getServingInfo(): Promise<GetServingInfoAJAXResponse> {
        return ajax("GET", "/ajax/published-restaurant/serving-info", {}, null);
    }
}
