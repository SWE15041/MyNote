import {register, Module} from "@wonder/core-fe";
import {RootState} from "type/state";
import {initialState} from "./state";

class LoginModule extends Module<RootState, "forgot"> {}

export const module = register(new LoginModule("forgot", initialState));
export const actions = module.getActions();
