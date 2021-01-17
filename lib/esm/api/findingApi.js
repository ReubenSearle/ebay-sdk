import marketplaceId from '../enums/marketplaceId.js';
export default class FindingApi {
    constructor(request) {
        this.ebayApiBaseUrl = 'https://svcs.ebay.com/services/search/FindingService/v1';
        this.request = request;
    }
    async findItemsAdvanced(options) {
        const params = this.getFindItemsAdvancedRequestParams(options);
        const response = await this.request.send(this.ebayApiBaseUrl, params);
        const responseError = this.getErrorFromResponse(response);
        if (responseError)
            throw new Error(responseError);
        return this.getMappedItemsFromResponse(response);
    }
    getFindItemsAdvancedRequestParams(options) {
        const params = new URLSearchParams({
            'OPERATION-NAME': 'findItemsAdvanced',
            'GLOBAL-ID': options.marketplaceId || marketplaceId.default
        });
        if (options.buyerPostalCode)
            params.append('buyerPostalCode', options.buyerPostalCode);
        if (options.categoryId)
            params.append('categoryId', options.categoryId.toString());
        if (options.keywords)
            params.append('keywords', options.keywords);
        if (options.itemsPerPage)
            params.append('paginationInput.entriesPerPage', options.itemsPerPage.toString());
        if (options.sortOrder)
            params.append('sortOrder', options.sortOrder);
        return params;
    }
    getErrorFromResponse(response) {
        return response?.findItemsAdvancedResponse?.[0]?.errorMessage?.[0]?.error?.[0]?.message?.[0] || null;
    }
    getMappedItemsFromResponse(response) {
        const responseItems = response?.findItemsAdvancedResponse?.[0]?.searchResult?.[0]?.item;
        return responseItems.map(this.getMappedItemFromResponse);
    }
    getMappedItemFromResponse(responseItem) {
        return {
            itemId: responseItem.itemId
        };
    }
}
