import marketplaceId from '../enums/marketplaceId.js';
export default class FindingApi {
    constructor(appConfig, request) {
        this.request = request;
        this.ebayApiBaseUrl = this.determineEbayApiUrl(appConfig);
    }
    determineEbayApiUrl(appConfig) {
        const domain = appConfig.sandbox ? 'https://svcs.sandbox.ebay.com' : 'https://svcs.ebay.com';
        const path = 'services/search/FindingService/v1';
        return new URL(`${domain}/${path}`);
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
        if (options.itemFilters) {
            options.itemFilters.forEach((itemFilter, index) => {
                params.append(`itemFilter(${index}).name`, itemFilter.name);
                params.append(`itemFilter(${index}).value`, itemFilter.value);
                if (itemFilter.paramName && itemFilter.paramValue) {
                    params.append(`itemFilter(${index}).paramName`, itemFilter.paramName);
                    params.append(`itemFilter(${index}).paramValue`, itemFilter.paramValue);
                }
            });
        }
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
        const mappedItem = {
            condition: responseItem.condition[0].conditionDisplayName[0],
            country: responseItem.country[0],
            imageUrls: responseItem.galleryURL.map((url) => new URL(url)),
            itemId: responseItem.itemId[0],
            listing: {
                bestOffer: (responseItem.listingInfo[0].bestOfferEnabled[0] === 'true'),
                buyItNow: (responseItem.listingInfo[0].buyItNowAvailable[0] === 'true'),
                startTime: new Date(responseItem.listingInfo[0].startTime[0]),
                endTime: new Date(responseItem.listingInfo[0].endTime[0]),
                listingType: responseItem.listingInfo[0].listingType[0]
            },
            location: {
                name: responseItem.location[0],
                postalCode: responseItem.postalCode[0]
            },
            marketplaceId: responseItem.globalId[0],
            primaryCategory: {
                categoryId: parseInt(responseItem.primaryCategory[0].categoryId[0]),
                categoryName: responseItem.primaryCategory[0].categoryName[0]
            },
            sellingStatus: {
                currentPrice: {
                    currency: responseItem.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'],
                    value: parseFloat(responseItem.sellingStatus[0].convertedCurrentPrice[0].__value__)
                }
            },
            shipping: {
                shippingType: responseItem.shippingInfo[0].shippingType[0]
            },
            title: responseItem.title[0],
            viewItemUrl: new URL(responseItem.viewItemURL[0])
        };
        if (responseItem.distance?.[0]) {
            mappedItem.distance = {
                units: responseItem.distance[0]['@unit'],
                value: parseFloat(responseItem.distance[0].__value__)
            };
        }
        if (responseItem.shippingInfo[0].shippingServiceCost?.[0]) {
            mappedItem.shipping.shippingPrice = {
                currency: responseItem.shippingInfo[0].shippingServiceCost[0]['@currencyId'],
                value: parseFloat(responseItem.shippingInfo[0].shippingServiceCost[0].__value__)
            };
        }
        return mappedItem;
    }
}
