import marketplaceIdEnum from './config/marketplaceIdEnum.js';
import FindingApi from './api/findingApi.js';
import Request from './utils/request.js';
const defaultAppConfig = {
    marketPlaceId: marketplaceIdEnum.DEFAULT,
    sandbox: false
};
export default class eBaySDK {
    constructor(appConfig) {
        this.appConfig = { ...defaultAppConfig, ...appConfig };
        this.request = new Request(this.appConfig);
    }
    get finding() {
        return this._finding || (this._finding = new FindingApi(this.request));
    }
}
