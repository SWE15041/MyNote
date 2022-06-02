import {bootstrap} from "@wonder/core-fe";
import {ErrorHandler} from "./module/ErrorHandler";
import {Main} from "./module/main";
import axios from "axios";
import config from "conf/config";
import "./index.less";
import {message} from "antd";

axios.interceptors.request.use(request => {
    if (request.url && request.url.indexOf("/event/envoyforrestaurantsV2") >= 0) {
        return {
            ...request,
            method: "POST",
            withCredentials: false,
        };
    }
    return {
        ...request,
        headers: {
            ...request.headers,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: 0,
        },
    };
});

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.statusCode && error.statusCode === 401) {
            if (error.responseData && error.responseData.errorCode === "INVALID_EMAIL_OR_PASSWORD") {
                throw error;
            } else {
                window.location.href = window.location.origin + "/login" + "?redirect_url=" + encodeURIComponent(window.location.pathname);
                return new Promise(() => {
                    // handle 401 network status code
                });
            }
        } else if (error.statusCode && error.statusCode === 403) {
            if (error.responseData && error.responseData.errorCode === "FORBIDDEN") {
                message.error("Permission Denied");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return new Promise(() => {
                    // handle 403 network status code
                });
            } else {
                throw error;
            }
        } else {
            throw error;
        }
    }
);
bootstrap({
    componentType: Main,
    errorListener: new ErrorHandler(),
    loggerConfig: {
        serverURL: config.logServerURL,
    },
});
