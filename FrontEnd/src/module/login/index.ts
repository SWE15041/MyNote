import {Module, register} from "@wonder/core-fe";
import {State} from "./type";
import LoginComponent from "./LoginMui";
import {RootState} from "type/state";

const initialState: State = {};

class LoginModule extends Module<RootState, "login"> {}

const module = register(new LoginModule("login", initialState));
export const actions = module.getActions();
export const Login = module.attachLifecycle(LoginComponent);
