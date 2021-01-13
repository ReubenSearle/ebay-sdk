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
    const responseItems = response?.findItemsByCategoryResponse?.[0]?.searchResult?.[0]?.item
    if (!responseItems) throw new Error('Failed to parse the eBay API response')
    return responseItems.map(this.getMappedItemFromResponse)
  }

  private getFindItemsAdvancedRequestParams (options: IFindItemsAdvancedRequestOptions) : URLSearchParams {
    const params = new URLSearchParams({
      'OPERATION-NAME': 'findItemsAdvanced',
      'GLOBAL-ID': options.marketplaceId,
      'paginationInput.entriesPerPage': options.itemsPerPage.toString()
    })
    if (options.buyerPostalCode) params.append('buyerPostalCode', options.buyerPostalCode)
    if (options.categoryId) params.append('categoryId', options.categoryId.toString())
    if (options.keywords) params.append('keywords', options.keywords)
    if (options.sortOrder) params.append('sortOrder', options.sortOrder)
    return params
  }

  private getMappedItemFromResponse (responseItem: any): IEbayItem {
    return {
      itemId: responseItem.itemId
    }
  }
}
