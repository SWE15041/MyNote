import {async} from "@wonder/core-fe";
import {EnvoyRoute} from "route/type";

const route: EnvoyRoute = {
    name: "Forgot Password",
    menu: "Forgot",
    path: "forgot",
    permission: "Admin",
    component: async(() => import("./index"), "Forgot"),
    children: [],
};
export default route;
