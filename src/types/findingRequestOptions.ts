import ItemFilterType from '../enums/itemFilterType'
import ItemSortOrder from '../enums/itemSortOrder'
import MarketplaceId from '../enums/marketplaceId'

export type ItemFilter = {
  name: ItemFilterType,
  value: string,
  paramName?: string,
  paramValue?: string
}

export type ItemFilters = [ItemFilter]

export type FindItemsAdvancedRequestOptions = {
  buyerPostalCode?: string,
  categoryId?: number,
  itemFilters?: ItemFilters,
  itemsPerPage?: number,
  keywords?: string,
  marketplaceId?: MarketplaceId
  sortOrder?: ItemSortOrder
}
