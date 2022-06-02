import {message} from "antd";
import {APIException} from "@wonder/core-fe";

const handleAJAXError = (error: APIException) => {
    const {responseData} = error;
    if (!responseData) {
        throw error;
    }
    if (responseData.message) {
        message.error(responseData.message);
    } else {
        throw error;
    }
};

export default handleAJAXError;
