import {ListPublishedMenuAJAXResponse$Category, SearchPublishedMenuItemAJAXResponse$MenuItem, ListPublishedMenuAJAXResponse$Menu, UpdateCategoryStatusAJAXRequest, PublishedMenuItemAJAXResponse} from "type/api";

export const LOADING_MENU_DATA = "LOADING_MENU_DATA";
export const LOADING_MENU_ITEM_LIST = "LOADING_MENU_ITEM_LIST";
export const LOADING_MENU_STATUS_UPDATE = "LOADING_MENU_STATUS_UPDATE";
export const LOADING_MENU_DEACTIVATE = "LOADING_MENU_DEACTIVATE";
export const LOADING_MENU_ITEM_DATA = "LOADING_MENU_ITEM_DATA";
export const LOADING_UPDATE_CATEGORY_STATUS = "LOADING_UPDATE_CATEGORY_STATUS";
export const LOADING_UPDATE_MENU_ITEM_STATUS = "LOADING_UPDATE_MENU_ITEM_STATUS";

export enum orderBy {
    asc = "asc",
    desc = "desc",
}

export const SortBy = [
    {name: "Item Name (A to Z)", value: `${orderBy.asc},name`},
    {name: "Item Name (Z to A)", value: `${orderBy.desc},name`},
    {name: "Price (Low to High)", value: `${orderBy.asc},price`},
    {name: "Price (High to Low)", value: `${orderBy.desc},price`},
    {name: "Active to Inactive Items", value: `${orderBy.desc},is_active`},
    {name: "Inactive to Active Items", value: `${orderBy.asc},is_active`},
];

export interface menuItemProps extends SearchPublishedMenuItemAJAXResponse$MenuItem {}

export interface MenuStatusRequest extends UpdateCategoryStatusAJAXRequest {}

export interface IFormInput {
    active: boolean;
    inactive: boolean;
    withModifier: boolean;
    withoutModifier: boolean;
    min: number | string;
    max: number | string;
}

export interface State {
    selectedCategory: ListPublishedMenuAJAXResponse$Category | null;
    menus: ListPublishedMenuAJAXResponse$Menu[];
    selectedMenu: ListPublishedMenuAJAXResponse$Menu | null;
    menuItems: menuItemProps[];
    selectedMenuItem: SearchPublishedMenuItemAJAXResponse$MenuItem | null;
    filterItemName: string | null;
    autoCompleteOptions: string[];
    total: number;
    selectedCategoryStatus: boolean;
    menuItem: PublishedMenuItemAJAXResponse | null;
    isDetail: boolean;
    filterOption: IFormInput | null;
}
