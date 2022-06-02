import {async} from "@wonder/core-fe";
import {EnvoyRoute} from "route/type";

const route: EnvoyRoute = {
    name: "Login",
    menu: "Login",
    path: "login",
    permission: "Admin",
    component: async(() => import("./index"), "Login"),
    children: [],
};
export default route;
