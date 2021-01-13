import MarketplaceId from '../enums/marketplaceIdEnum'
import SortOrder from '../enums/sortOrder'

export interface IFindItemsAdvancedRequestOptions {
  buyerPostalCode?: string,
  categoryId?: number,
  itemsPerPage: number,
  keywords?: string,
  marketplaceId: MarketplaceId
  sortOrder?: SortOrder
}
