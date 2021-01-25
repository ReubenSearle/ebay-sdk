import ItemFilterType from '../enums/itemFilterType';
import ItemSortOrder from '../enums/itemSortOrder';
import MarketplaceId from '../enums/marketplaceId';
export declare type ItemFilter = {
    name: ItemFilterType;
    value: string;
    paramName?: string;
    paramValue?: string;
};
export declare type ItemFilters = ItemFilter[];
export declare type FindItemsAdvancedRequestOptions = {
    buyerPostalCode?: string;
    categoryId?: number;
    itemFilters?: ItemFilters;
    itemsPerPage?: number;
    keywords?: string;
    marketplaceId?: MarketplaceId;
    sortOrder?: ItemSortOrder;
};
