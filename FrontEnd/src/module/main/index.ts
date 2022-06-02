import MainComponent from "./Main";

import {module} from "./module";

export const mainActions = module.getActions();
export const Main = module.attachLifecycle(MainComponent);
