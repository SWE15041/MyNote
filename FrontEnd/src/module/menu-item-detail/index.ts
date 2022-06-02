export {actions} from "./module";
import {module} from "./module";
import {MenuItemDetail as MenuItemDetailComp} from "./MenuItemDetail";

export const MenuItemDetail = module.attachLifecycle(MenuItemDetailComp);
