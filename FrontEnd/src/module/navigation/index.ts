import {Module, register} from "@wonder/core-fe";
import {RootState} from "type/state";
import NavigationComponent from "./Navigation";
import {initialState} from "./state";

class NavigationModule extends Module<RootState, "navigation"> {}

const module = register(new NavigationModule("navigation", initialState));

export const actions = module.getActions();
export const Navigation = module.attachLifecycle(NavigationComponent);
