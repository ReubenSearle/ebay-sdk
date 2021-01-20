import currency from '../enums/currency.js';
import distanceUnits from '../enums/distanceUnits.js';
import listingType from '../enums/listingType.js';
import marketplaceId from '../enums/marketplaceId.js';
import shippingType from '../enums/shippingType.js';
export declare type EbayItem = {
    condition: string;
    country: string;
    distance?: {
        units: distanceUnits;
        value: number;
    };
    imageUrls: Array<URL>;
    itemId: string;
    listing: {
        bestOffer: boolean;
        buyItNow: boolean;
        startTime: Date;
        endTime: Date;
        listingType: listingType;
    };
    location: {
        name: string;
        postalCode: string;
    };
    marketplaceId: marketplaceId;
    primaryCategory: {
        categoryId: number;
        categoryName: string;
    };
    sellingStatus: {
        currentPrice: {
            currency: currency;
            value: number;
        };
    };
    shipping: {
        shippingPrice?: {
            currency: currency;
            value: number;
        };
        shippingType: shippingType;
    };
    title: string;
    viewItemUrl: URL;
};
export declare type EbayItems = [EbayItem];
