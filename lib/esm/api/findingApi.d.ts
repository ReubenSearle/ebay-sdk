import { AppConfig } from '../types/appConfig.js';
import { EbayItems } from '../types/ebayItems.js';
import { FindItemsAdvancedRequestOptions } from '../types/findingRequestOptions.js';
import Request from '../utils/request.js';
export default class FindingApi {
    private readonly request;
    private readonly ebayApiBaseUrl;
    constructor(appConfig: AppConfig, request: Request);
    private determineEbayApiUrl;
    findItemsAdvanced(options: FindItemsAdvancedRequestOptions): Promise<EbayItems>;
    private getFindItemsAdvancedRequestParams;
    private getErrorFromResponse;
    private getMappedItemsFromResponse;
    private getMappedItemFromResponse;
}
