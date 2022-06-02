import {async} from "@wonder/core-fe";
import React from "react";
import {MenuPageIcon} from "asset/icon";
import {EnvoyRoute} from "route/type";

const route: EnvoyRoute = {
    name: "Menu",
    menu: "Menu",
    path: "menu",
    icon: <MenuPageIcon />,
    permission: "Admin",
    component: async(() => import("./index"), "Menu"),
    children: [
        {
            name: "Menu Item",
            menu: "Menu Item",
            path: ":id",
            permission: "Admin",
            component: async(() => import("./index"), "Menu"),
            children: [
                {
                    name: "MenuItemDetail",
                    menu: "MenuItemDetail",
                    path: "menuItem/:menuItemId",
                    permission: "Admin",
                    component: async(() => import("../menu-item-detail/index"), "MenuItemDetail"),
                    children: [],
                },
            ],
        },
    ],
};
export default route;
