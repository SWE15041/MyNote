import React from "react";
import {Modal as MobileModal} from "antd-mobile";

import {attachPropertiesToComponent} from "utils/attachPropertiesToCom";
import "./index.less";

export default attachPropertiesToComponent(MobileModal, {
    show: MobileModal.show,
    alert: MobileModal.alert,
    confirm: MobileModal.confirm,
    clear: MobileModal.clear,
});
