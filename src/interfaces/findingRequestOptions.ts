import MarketplaceId from '../enums/marketplaceId'
import ItemSortOrder from '../enums/itemSortOrder'

export interface IFindItemsAdvancedRequestOptions {
  buyerPostalCode?: string,
  categoryId?: number,
  itemsPerPage?: number,
  keywords?: string,
  marketplaceId?: MarketplaceId
  sortOrder?: ItemSortOrder
}
