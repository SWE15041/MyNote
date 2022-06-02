import {UpdateCategoryStatusAJAXRequest, GetCategoryStatusAJAXResponse} from "type/api";
import {ajax} from "@wonder/core-fe";

export class PublishedMenuAJAXWebService {
    static updateCategoryStatus(menuId: string, categoryId: string, request: UpdateCategoryStatusAJAXRequest): Promise<void> {
        return ajax("PUT", "/ajax/published-menu/:menuId/category/:categoryId", {menuId, categoryId}, request);
    }
    static getCategoryStatus(menuId: string, categoryId: string): Promise<GetCategoryStatusAJAXResponse> {
        return ajax("GET", "/ajax/published-menu/:menuId/category/:categoryId/status", {menuId, categoryId}, null);
    }
}
