export default class FindingApi {
    constructor(request) {
        this.ebayApiBaseUrl = 'https://svcs.ebay.com/services/search/FindingService/v1';
        this.request = request;
    }
    async findItemsAdvanced(options) {
        const params = this.getFindItemsAdvancedRequestParams(options);
        const response = await this.request.send(this.ebayApiBaseUrl, params);
        const responseError = response?.findItemsAdvancedResponse?.[0]?.errorMessage?.[0]?.error?.[0]?.message?.[0];
        if (responseError)
            throw new Error(responseError);
        const responseItems = response?.findItemsAdvancedResponse?.[0]?.searchResult?.[0]?.item;
        if (!responseItems)
            throw new Error('Failed to parse the eBay API response');
        return responseItems.map(this.getMappedItemFromResponse);
    }
    getFindItemsAdvancedRequestParams(options) {
        const params = new URLSearchParams({
            'OPERATION-NAME': 'findItemsAdvanced',
            'GLOBAL-ID': options.marketplaceId,
            'paginationInput.entriesPerPage': options.itemsPerPage.toString()
        });
        if (options.buyerPostalCode)
            params.append('buyerPostalCode', options.buyerPostalCode);
        if (options.categoryId)
            params.append('categoryId', options.categoryId.toString());
        if (options.keywords)
            params.append('keywords', options.keywords);
        if (options.sortOrder)
            params.append('sortOrder', options.sortOrder);
        return params;
    }
    getMappedItemFromResponse(responseItem) {
        return {
            itemId: responseItem.itemId
        };
    }
}
