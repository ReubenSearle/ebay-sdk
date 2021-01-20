import { EbayItems } from '../types/ebayItems.js';
import { FindItemsAdvancedRequestOptions } from '../types/findingRequestOptions.js';
import Request from '../utils/request.js';
export default class FindingApi {
    private readonly ebayApiBaseUrl;
    private readonly request;
    constructor(request: Request);
    findItemsAdvanced(options: FindItemsAdvancedRequestOptions): Promise<EbayItems>;
    private getFindItemsAdvancedRequestParams;
    private getErrorFromResponse;
    private getMappedItemsFromResponse;
    private getMappedItemFromResponse;
}
