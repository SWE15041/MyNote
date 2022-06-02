import {async} from "@wonder/core-fe";
import React from "react";
import {SupportPageIcon} from "asset/icon";
import {EnvoyRoute} from "route/type";

const route: EnvoyRoute = {
    name: "Support",
    menu: "Support",
    path: "support",
    icon: <SupportPageIcon />,
    permission: "Admin",
    component: async(() => import("./index"), "Support"),
    children: [
        {
            name: "Support Sub Page",
            menu: "Support Sub Page",
            path: "support-sub-page",
            permission: "Admin",
            component: async(() => import("./index"), "Support"),
        },
    ],
};
export default route;
