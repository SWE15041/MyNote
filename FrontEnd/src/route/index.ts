import {EnvoyRoute} from "./type";

import loginRoute from "../module/login/route";
import menuRoute from "../module/menu/route";
import supportRoute from "../module/support/route";
import orderHistoryRoute from "../module/order-history/route";
import forgotPassword from "../module/forgot-password/route";

export const AlonePagePath = [`/${loginRoute.path}`, `/${forgotPassword.path}`];

const routes: EnvoyRoute[] = [loginRoute, menuRoute, supportRoute, orderHistoryRoute, forgotPassword];

export const EnvoyMenus: EnvoyRoute[] = [menuRoute, orderHistoryRoute, supportRoute];

export const EnvoyRoutes = routes;
