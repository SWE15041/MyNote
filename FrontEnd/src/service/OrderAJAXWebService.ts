import {
    GetOrderAJAXResponse,
    ConfirmOrderRequest,
    GetOrderPreparationTimeResponse,
    UpdateOrderPreparationTimeAJAXRequest,
    CreateOrderViewHistoryAJAXRequest,
    GetDashboardAJAXResponse,
    SearchOrderByStatusAJAXRequest,
    SearchOrderByStatusAJAXResponse,
    SearchOrderAJAXRequestV3,
    SearchOrderAJAXResponse,
} from "type/api";
import {ajax} from "@wonder/core-fe";

export class OrderAJAXWebService {
    static get(orderId: string): Promise<GetOrderAJAXResponse> {
        return ajax("GET", "/ajax/order/:orderId", {orderId}, null);
    }
    static cancel(orderId: string): Promise<void> {
        return ajax("POST", "/ajax/order/:orderId/cancel", {orderId}, null);
    }
    static complete(orderId: string): Promise<void> {
        return ajax("PUT", "/ajax/order/:orderId/complete", {orderId}, null);
    }
    static confirmOrder(orderId: string, request: ConfirmOrderRequest): Promise<void> {
        return ajax("PUT", "/ajax/order/:orderId/confirm", {orderId}, request);
    }
    static inTransit(orderId: string): Promise<void> {
        return ajax("PUT", "/ajax/order/:orderId/in-transit", {orderId}, null);
    }
    static getPreparationTime(orderId: string): Promise<GetOrderPreparationTimeResponse> {
        return ajax("GET", "/ajax/order/:orderId/preparation-time", {orderId}, null);
    }
    static updatePreparationTime(orderId: string, request: UpdateOrderPreparationTimeAJAXRequest): Promise<void> {
        return ajax("PUT", "/ajax/order/:orderId/preparation-time", {orderId}, request);
    }
    static printReceipt(orderId: string): Promise<void> {
        return ajax("POST", "/ajax/order/:orderId/printing-receipt", {orderId}, null);
    }
    static readyForPickup(orderId: string): Promise<void> {
        return ajax("PUT", "/ajax/order/:orderId/ready-for-pickup", {orderId}, null);
    }
    static createViewHistory(orderId: string, request: CreateOrderViewHistoryAJAXRequest): Promise<void> {
        return ajax("POST", "/ajax/order/:orderId/view-history", {orderId}, request);
    }
    static dashboard(): Promise<GetDashboardAJAXResponse> {
        return ajax("GET", "/ajax/order/dashboard", {}, null);
    }
    static searchOrderByStatus(request: SearchOrderByStatusAJAXRequest): Promise<SearchOrderByStatusAJAXResponse> {
        return ajax("GET", "/ajax/order/search-by-status", {}, request);
    }
    static searchV3(request: SearchOrderAJAXRequestV3): Promise<SearchOrderAJAXResponse> {
        return ajax("PUT", "/v3/ajax/order", {}, request);
    }
}
