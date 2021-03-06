import { AppConfig } from '../types/appConfig.js';
export default class Request {
    private readonly appConfig;
    constructor(appConfig: AppConfig);
    send(baseUrl: URL, params: URLSearchParams): Promise<any>;
    private getDefaultRequestParams;
}
