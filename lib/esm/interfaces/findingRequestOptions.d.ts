import ItemFilterType from '../enums/itemFilterType';
import ItemSortOrder from '../enums/itemSortOrder';
import MarketplaceId from '../enums/marketplaceId';
export interface IItemFilter {
    name: ItemFilterType;
    value: string;
    paramName?: string;
    paramValue?: string;
}
export interface IItemFilters extends Array<IItemFilter> {
}
export interface IFindItemsAdvancedRequestOptions {
    buyerPostalCode?: string;
    categoryId?: number;
    itemFilters?: IItemFilters;
    itemsPerPage?: number;
    keywords?: string;
    marketplaceId?: MarketplaceId;
    sortOrder?: ItemSortOrder;
}
