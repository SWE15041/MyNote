import {PublishedMenuItemAJAXResponse} from "type/api";

export const LOADING_MENU_ITEM_DATA = "LOADING_MENU_ITEM_DATA";

export interface State {
    menuItem: PublishedMenuItemAJAXResponse | null;
}
