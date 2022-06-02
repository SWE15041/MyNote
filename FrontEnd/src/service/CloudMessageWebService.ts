import {ReplaceCloudMessageTokenRequest} from "type/api";
import {ajax} from "@wonder/core-fe";

export class CloudMessageWebService {
    static replaceCloudMessage(request: ReplaceCloudMessageTokenRequest): Promise<void> {
        return ajax("PUT", "/cloud-message/replace", {}, request);
    }
}
