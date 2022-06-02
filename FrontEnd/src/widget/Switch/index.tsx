import React from "react";
import {Switch} from "antd-mobile";
import {SwitchProps} from "antd-mobile/es/components/switch/switch";
import "./index.less";

const EnvoySwitch = (props: SwitchProps) => {
    return (
        <Switch
            style={{
                "--checked-color": "#22A61F",
            }}
            {...props}
        />
    );
};
export default EnvoySwitch;
