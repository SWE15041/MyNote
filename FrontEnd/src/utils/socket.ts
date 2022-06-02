export interface SocketOption {
    url: string;
    heartTime?: number;
    reConnectWaitingTime?: number;
    reConnectCount?: number;
    isJSON?: boolean;
    onMessage: (data?: any) => void;
    onError?: (event: Event) => void;
    onReconnectError?: () => void;
    onClose?: (event: CloseEvent) => void;
    onOpen?: (event: Event) => void;
}

let timer: any;

export default class Socket {
    readonly URL: string;
    readonly HEART_SECONDS: number;
    readonly WAITING_SECONDS: number;
    readonly RE_CONNECT_COUNT: number;
    readonly isJSON: boolean;
    private ws: WebSocket | null;
    private wsInterval: any;
    private events: Partial<Pick<SocketOption, "onMessage" | "onClose" | "onError" | "onOpen" | "onReconnectError">>;
    private errorCount: number = 0;
    constructor(option: SocketOption) {
        this.URL = option.url;
        this.HEART_SECONDS = (option.heartTime || 20) * 1000;
        this.WAITING_SECONDS = (option.reConnectWaitingTime || 2) * 1000;
        this.RE_CONNECT_COUNT = option.reConnectCount || 5;
        this.isJSON = option.isJSON || true;
        this.events = {};
        this.events.onMessage = option.onMessage;
        this.events.onClose = option.onClose;
        this.events.onError = option.onError;
        this.events.onReconnectError = option.onReconnectError;
        this.events.onOpen = option.onOpen;
        this.ws = null;
    }

    connect() {
        this.close();
        this.ws = new WebSocket(this.URL);
        this.bindEvent();
    }

    close() {
        this.endHeart();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    private reConnect() {
        if (this.errorCount > this.RE_CONNECT_COUNT) {
            if (this.events.onReconnectError) {
                this.events.onReconnectError();
            }
            return this.close();
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            this.connect();
            this.errorCount++;
        }, this.WAITING_SECONDS);
    }

    private bindEvent() {
        if (this.ws) {
            const {onOpen, onError, onClose, onMessage} = this.events;
            this.ws.onopen = event => {
                this.startHeart();
                if (onOpen) {
                    onOpen(event);
                }
            };
            this.ws.onclose = event => {
                if (onClose) {
                    onClose(event);
                }
                if (this.ws) {
                    this.reConnect();
                }
            };
            this.ws.onerror = event => {
                if (onError) {
                    onError(event);
                }
                this.reConnect();
            };
            this.ws.onmessage = event => {
                if (onMessage) {
                    try {
                        onMessage(this.isJSON ? JSON.parse(event.data) : event.data);
                    } catch (err) {
                        if (this.isJSON) {
                            onMessage(event.data);
                        } else {
                            // console.info("Unknown error: ", err);
                        }
                    }
                }
            };
        }
    }

    private startHeart() {
        this.wsInterval = setInterval(() => {
            if (this.ws) {
                try {
                    this.ws.send("{}");
                } catch (err) {
                    // console.info(err);
                }
            }
        }, this.HEART_SECONDS);
    }

    private endHeart() {
        clearInterval(this.wsInterval);
        this.wsInterval = null;
    }
}
