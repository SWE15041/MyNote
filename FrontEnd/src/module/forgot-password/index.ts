import {Module, register} from "@wonder/core-fe";
import {State} from "./type";

import Main from "./ForgotPassword";
import {RootState} from "../../type/state";

const initialState: State = {};

class LoginModule extends Module<RootState, "forgot"> {}

const module = register(new LoginModule("forgot", initialState));
export const actions = module.getActions();

export const Forgot = module.attachLifecycle(Main);
