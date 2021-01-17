import currency from '../enums/currency.js'
import distanceUnits from '../enums/distanceUnits.js'
import listingType from '../enums/listingType.js'
import marketplaceId from '../enums/marketplaceId.js'
import shippingType from '../enums/shippingType.js'
import { IEbayItems, IEbayItem } from '../interfaces/ebayItems.js'
import { IFindItemsAdvancedRequestOptions } from '../interfaces/findingRequestOptions.js'
import Request from '../utils/request.js'

export default class FindingApi {
  private readonly ebayApiBaseUrl = 'https://svcs.ebay.com/services/search/FindingService/v1'
  private readonly request: Request

  constructor (request: Request) {
    this.request = request
  }

  async findItemsAdvanced (options: IFindItemsAdvancedRequestOptions): Promise<IEbayItems> {
    const params = this.getFindItemsAdvancedRequestParams(options)
    const response = await this.request.send(this.ebayApiBaseUrl, params)
    const responseError = this.getErrorFromResponse(response)
    if (responseError) throw new Error(responseError)
    return this.getMappedItemsFromResponse(response)
  }

  private getFindItemsAdvancedRequestParams (options: IFindItemsAdvancedRequestOptions) : URLSearchParams {
    const params = new URLSearchParams({
      'OPERATION-NAME': 'findItemsAdvanced',
      'GLOBAL-ID': options.marketplaceId || marketplaceId.default
    })
    if (options.buyerPostalCode) params.append('buyerPostalCode', options.buyerPostalCode)
    if (options.categoryId) params.append('categoryId', options.categoryId.toString())
    if (options.keywords) params.append('keywords', options.keywords)
    if (options.itemsPerPage) params.append('paginationInput.entriesPerPage', options.itemsPerPage.toString())
    if (options.sortOrder) params.append('sortOrder', options.sortOrder)
    return params
  }

  private getErrorFromResponse (response: any): string {
    return response?.findItemsAdvancedResponse?.[0]?.errorMessage?.[0]?.error?.[0]?.message?.[0] || null
  }

  private getMappedItemsFromResponse (response: any): IEbayItems {
    const responseItems = response?.findItemsAdvancedResponse?.[0]?.searchResult?.[0]?.item
    return responseItems.map(this.getMappedItemFromResponse)
  }

  private getMappedItemFromResponse (responseItem: any): IEbayItem {
    const mappedItem = <IEbayItem> {
      condition: responseItem.condition[0].conditionDisplayName[0],
      country: responseItem.country[0],
      imageUrls: responseItem.galleryURL.map((url: string) => new URL(url)),
      itemId: responseItem.itemId[0],
      listing: {
        bestOffer: (responseItem.listingInfo[0].bestOfferEnabled[0] === 'true'),
        buyItNow: (responseItem.listingInfo[0].buyItNowAvailable[0] === 'true'),
        startTime: new Date(responseItem.listingInfo[0].startTime[0]),
        endTime: new Date(responseItem.listingInfo[0].endTime[0]),
        listingType: <listingType>responseItem.listingInfo[0].listingType[0]
      },
      location: {
        name: responseItem.location[0],
        postalCode: responseItem.postalCode[0]
      },
      marketplaceId: <marketplaceId>responseItem.globalId[0],
      primaryCategory: {
        categoryId: parseInt(responseItem.primaryCategory[0].categoryId[0]),
        categoryName: responseItem.primaryCategory[0].categoryName[0]
      },
      sellingStatus: {
        currentPrice: {
          currency: <currency>responseItem.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'],
          value: parseFloat(responseItem.sellingStatus[0].convertedCurrentPrice[0].__value__)
        }
      },
      shipping: {
        shippingPrice: {
          currency: <currency>responseItem.shippingInfo[0].shippingServiceCost[0]['@currencyId'],
          value: parseFloat(responseItem.shippingInfo[0].shippingServiceCost[0].__value__)
        },
        shippingType: <shippingType>responseItem.shippingInfo[0].shippingType[0]
      },
      title: responseItem.title[0],
      viewItemUrl: new URL(responseItem.viewItemURL[0])
    }
    if (responseItem.distance?.[0]) {
      mappedItem.distance = {
        units: <distanceUnits>responseItem.distance[0]['@unit'],
        value: parseFloat(responseItem.distance[0].__value__)
      }
    }
    return mappedItem
  }
}
