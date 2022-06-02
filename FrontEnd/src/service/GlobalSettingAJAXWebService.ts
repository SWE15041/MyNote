import {GetSupportPhoneNumber} from "type/api";
import {ajax} from "@wonder/core-fe";

export class GlobalSettingAJAXWebService {
    static getSupportPhoneNumber(): Promise<GetSupportPhoneNumber> {
        return ajax("GET", "/ajax/support-phone-number", {}, null);
    }
}
