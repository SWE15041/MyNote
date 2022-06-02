import {UpdatePublishedMenuItemStatusAJAXRequest} from "type/api";
import {ajax} from "@wonder/core-fe";

export class PublishedMenuItemAJAXWebService {
    static updateStatus(id: string, request: UpdatePublishedMenuItemStatusAJAXRequest): Promise<void> {
        return ajax("PUT", "/ajax/published-menu-item/:id", {id}, request);
    }
}
