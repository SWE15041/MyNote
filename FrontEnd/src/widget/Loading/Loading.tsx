import React from "react";
import {createPortal} from "react-dom";
import "./Loading.less";
interface Props {
    loading: boolean;
}
const Mark = () => (
    <div className="envoy-mark ant-spin-container">
        <div className="ant-spin ant-spin-spinning">
            <span className="ant-spin-dot ant-spin-dot-spin">
                <i className="ant-spin-dot-item" />
                <i className="ant-spin-dot-item" />
                <i className="ant-spin-dot-item" />
                <i className="ant-spin-dot-item" />
            </span>
        </div>
    </div>
);
const Loading = (props: Props) => {
    const {loading} = props;
    return <>{loading && createPortal(<Mark />, document.body)}</>;
};
export default Loading;
