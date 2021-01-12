import { AppConfig } from './types/appConfig.js';
import FindingApi from './api/findingApi.js';
export default class eBaySDK {
    private readonly appConfig;
    private readonly request;
    private _finding?;
    constructor(appConfig: AppConfig);
    get finding(): FindingApi;
}
