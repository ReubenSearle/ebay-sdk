import FindingApi from './api/findingApi.js';
import Request from './utils/request.js';
export default class eBaySDK {
    constructor(appConfig) {
        this.appConfig = appConfig;
        this.request = new Request(this.appConfig);
    }
    get finding() {
        return this._finding || (this._finding = new FindingApi(this.appConfig, this.request));
    }
}
