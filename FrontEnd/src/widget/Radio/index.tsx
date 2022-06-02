import React from "react";
import {Radio} from "antd-mobile";

const {Group} = Radio;
import {RadioProps} from "antd-mobile/es/components/radio/radio";
import {attachPropertiesToComponent} from "utils/attachPropertiesToCom";
import "./index.less";

const Point = () => <span className="radio-checked-point" />;
const DefaultPoint = () => <span className="default-radio-point" />;

interface EnvoyRadio extends RadioProps {
    children: React.ReactNode;
}

const EnvoyRadio = (props: EnvoyRadio) => {
    const {icon, ...otherProps} = props;
    return <Radio {...otherProps} icon={checked => (checked ? <Point /> : <DefaultPoint />)} />;
};
export default attachPropertiesToComponent(EnvoyRadio, {
    Group,
});
