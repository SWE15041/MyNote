import {register, Module} from "@wonder/core-fe";
import {RootState} from "type/state";
import {initialState} from "./state";

class SupportModule extends Module<RootState, "support"> {}

export const module = register(new SupportModule("support", initialState));
export const actions = module.getActions();
