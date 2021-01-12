export default class FindingApi {
    constructor(request) {
        this.ebayApiBaseUrl = 'https://svcs.ebay.com/services/search/FindingService/v1';
        this.request = request;
    }
    async findItemsByCategory(categoryId) {
        const params = new URLSearchParams({
            'OPERATION-NAME': 'findItemsByCategory',
            'GLOBAL-ID': 'EBAY-GB',
            'paginationInput.entriesPerPage': '100',
            categoryId: categoryId.toString(),
            sortOrder: 'DistanceNearest',
            buyerPostalCode: 'CT19 5HE'
        });
        const response = await this.request.send(this.ebayApiBaseUrl, params);
        const responseItems = response.findItemsByCategoryResponse[0].searchResult[0].item;
        return responseItems.map(responseItem => {
            return {
                itemId: responseItem.itemId
            };
        });
    }
}
