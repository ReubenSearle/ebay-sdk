import { IEbayItems } from '../interfaces/ebayItems.js';
import { IFindItemsAdvancedRequestOptions } from '../interfaces/findingRequestOptions.js';
import Request from '../utils/request.js';
export default class FindingApi {
    private readonly ebayApiBaseUrl;
    private readonly request;
    constructor(request: Request);
    findItemsAdvanced(options: IFindItemsAdvancedRequestOptions): Promise<IEbayItems>;
    private getFindItemsAdvancedRequestParams;
    private getErrorFromResponse;
    private getMappedItemsFromResponse;
    private getMappedItemFromResponse;
}
