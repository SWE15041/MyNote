import {useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "type/state";
import menuRoute from "../../../menu/route";

interface HistoryRoute {
    name: string;
    path: string;
}

function getUrlMenuId(key: string): null | string {
    const paths = location.pathname.split("/");
    const [, name, id] = paths || [];
    if (name === key) {
        return id;
    }
    return null;
}

export const useChangeMenuBreadcrumb = (historyRoutes: HistoryRoute[]) => {
    const {menus, menuItem} = useSelector((state: RootState) => ({
        menus: state.app.restaurant.menus,
        menuItem: state.app?.menuItemDetail?.menuItem,
    }));
    const [firstMenu] = menus;
    const menuId = getUrlMenuId("menu") || firstMenu?.menu_id;
    const menuItemName = menuId && menus.find(path => path.menu_id === menuId);
    const toChangeMenuKeyName = menuRoute.children && menuRoute.children[0].name;
    const replaceRouteName = {
        ...(menuItemName && toChangeMenuKeyName && {[toChangeMenuKeyName]: menuItemName.name}),
        ...(menuItem && {MenuItemDetail: menuItem.base_info.name}),
    };
    const updateReplaceField = JSON.stringify(replaceRouteName);
    const updateHistoryRoutesField = JSON.stringify(historyRoutes);

    const historyRoutesArray = useMemo(() => {
        return historyRoutes.map(item => {
            const {name, path} = item;
            const changeRouteItemName = replaceRouteName[name];
            if (path === "/menu") {
                return {...item, path: `/menu`};
            }
            if (typeof changeRouteItemName === "string") {
                return {name: changeRouteItemName, path: `/menu/${menuId}`};
            }
            return item;
        });
    }, [updateReplaceField, updateHistoryRoutesField]);

    return {
        historyRoutesArray,
    };
};
