import { IEbayItem } from '../interfaces/ebayItem.js'
import Request from '../utils/request.js'

export default class FindingApi {
  private readonly ebayApiBaseUrl = 'https://svcs.ebay.com/services/search/FindingService/v1'
  private readonly request: Request

  constructor (request: Request) {
    this.request = request
  }

  async findItemsByCategory (categoryId: Number): Promise<Array<IEbayItem>> {
    const params = new URLSearchParams({
      'OPERATION-NAME': 'findItemsByCategory',
      'GLOBAL-ID': 'EBAY-GB',
      'paginationInput.entriesPerPage': '100',
      categoryId: categoryId.toString(),
      sortOrder: 'DistanceNearest',
      buyerPostalCode: 'CT19 5HE'
    })
    const response = await this.request.send(this.ebayApiBaseUrl, params)
    const responseItems = <Array<IEbayItem>> response.findItemsByCategoryResponse[0].searchResult[0].item
    return responseItems.map(responseItem => {
      return {
        itemId: responseItem.itemId
      }
    })
  }
}
