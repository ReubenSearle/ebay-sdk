import { IEbayItem } from '../interfaces/ebayItem.js';
import Request from '../utils/request.js';
export default class FindingApi {
    private readonly ebayApiBaseUrl;
    private readonly request;
    constructor(request: Request);
    findItemsByCategory(categoryId: Number): Promise<Array<IEbayItem>>;
}
