import {UnsubscribeWeeklySummaryEmailAJAXRequest} from "type/api";
import {ajax} from "@wonder/core-fe";

export class RestaurantAJAXWebService {
    static unsubscribeSummaryEmail(request: UnsubscribeWeeklySummaryEmailAJAXRequest): Promise<void> {
        return ajax("PUT", "/ajax/restaurant/weekly-summary-email", {}, request);
    }
}
