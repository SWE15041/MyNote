import {restaurantActions} from "./index";
import {app} from "@wonder/core-fe/lib/app";
import config from "conf/config";
import {WSWebServerNotifyMessage, WSWebServerNotifyMessage$MessageType} from "type/api";
import {State} from "./type";

export const initialState: State = {
    restaurantInfo: null,
    isOutOfServiceTime: false,
    servingInfo: null,
    socketParams: {
        url: `wss://${config.host}/ws/web-server-notify`,
        onMessage: (data: WSWebServerNotifyMessage): void => {
            if (window.location.pathname === "/login") {
                return;
            }
            const restaurantPauseChange = data.message_type === WSWebServerNotifyMessage$MessageType.RESTAURANT_PAUSE_DURATION_CHANGE;

            if (data.restaurant_status_change || restaurantPauseChange) {
                app.store.dispatch(restaurantActions.getServingInfo());
            }
        },
        heartTime: 10,
        onOpen: (): void => {
            //....
        },
        onError: (): void => {
            //....
        },
        onClose: (): void => {
            //....
        },
        reConnectWaitingTime: 0,
        reConnectCount: 99999,
    },
    socket: null,
    menus: [],
    userInfo: null,
    restaurantList: [],
};
