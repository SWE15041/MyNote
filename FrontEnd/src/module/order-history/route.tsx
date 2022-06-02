import {async} from "@wonder/core-fe";
import React from "react";
import {OrderHistoryPageIcon} from "asset/icon";
import {EnvoyRoute} from "route/type";

const route: EnvoyRoute = {
    name: "Order History",
    menu: "Order History",
    path: "order-history",
    icon: <OrderHistoryPageIcon />,
    permission: "Admin",
    component: async(() => import("./index"), "OrderHistory"),
    children: [],
};
export default route;
