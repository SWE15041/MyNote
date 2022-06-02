import React from "react";
import {Empty} from "antd";
import {useSelector} from "react-redux";
import {useUnaryAction, useLoadingStatus} from "@wonder/core-fe";

import {MenuItemList} from "./component/MenuItemList";
import MobileMenu from "./m-menu/MobileMenu";
import {CustomTabs} from "./component/CustomTabs";
import {CustomInputAutocomplete} from "./component/CustomInputAutocomplete";
import {ExportMenuModal} from "./Modal/ExportMenuModal";

import {useResponsive} from "hooks/useResponsive";
import {useGlobalLoading} from "hooks/useGlobalLoading";

import {RootState} from "../../type/state";
import {actions} from "./module";
import {LOADING_MENU_ITEM_LIST} from "./type";
import "./index.less";

const PcMenu = () => {
    const {autoCompleteOptions, selectedMenu, menuItems, total, filterItemName, selectedCategory, selectedCategoryStatus} = useSelector((state: RootState) => ({
        autoCompleteOptions: state.app.menu.autoCompleteOptions,
        selectedMenu: state.app.menu.selectedMenu,
        menuItems: state.app.menu.menuItems,
        total: state.app.menu.total,
        filterItemName: state.app.menu.filterItemName,
        selectedCategory: state.app.menu.selectedCategory,
        selectedCategoryStatus: state.app.menu.selectedCategoryStatus,
    }));
    const setFilterItemName = useUnaryAction(actions.setFilterItemName);
    const setSelectedCategory = useUnaryAction(actions.setSelectedCategory);
    const loadingMenuItemList = useLoadingStatus(LOADING_MENU_ITEM_LIST);
    const onSearch = (val: string | null) => {
        setFilterItemName(val);
        if (selectedMenu) {
            setSelectedCategory(selectedMenu.categories[0]);
        }
    };

    return (
        <div className="menu-page">
            <div className="menu-header">
                <h2 style={{fontWeight: 400, color: "#000", fontSize: "20px", lineHeight: "30px"}}>{selectedMenu?.name}</h2>
                <div className="menu-header_right">
                    <ExportMenuModal />
                    <CustomInputAutocomplete options={autoCompleteOptions} onSearch={onSearch} />
                </div>
            </div>
            <CustomTabs handleCategoryChange={category => setSelectedCategory(category)} />
            <MenuItemList selectedCategoryStatus={selectedCategoryStatus} categoryId={selectedCategory?.id ?? null} categoryName={selectedCategory?.name} filterItemName={filterItemName} loading={loadingMenuItemList} menuItems={menuItems} total={total} />
        </div>
    );
};

const Menu = () => {
    const screens = useResponsive();
    const menus = useSelector((state: RootState) => state.app.restaurant.menus);
    const [globalLoading] = useGlobalLoading();

    if (menus.length === 0 && !globalLoading)
        return (
            <div className="not-date">
                <Empty />
            </div>
        );
    return <>{screens.xs ? <PcMenu /> : <MobileMenu />}</>;
};

export default Menu;
