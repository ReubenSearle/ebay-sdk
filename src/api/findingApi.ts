import marketplaceId from '../enums/marketplaceId.js'
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
    return {
      itemId: responseItem.itemId
    }
  }
}
