import MarketplaceId from '../enums/marketplaceId';
import SortOrder from '../enums/sortOrder';
export interface IFindItemsAdvancedRequestOptions {
    buyerPostalCode?: string;
    categoryId?: number;
    itemsPerPage: number;
    keywords?: string;
    marketplaceId: MarketplaceId;
    sortOrder?: SortOrder;
}
