import fetch from 'node-fetch';
export default class Request {
    constructor(appConfig) {
        this.appConfig = appConfig;
    }
    async send(baseUrl, params) {
        try {
            const defaultParams = this.getDefaultRequestParams();
            const url = `${baseUrl}/${params.toString}${defaultParams.toString()}`;
            const response = await fetch(url);
            return response.json();
        }
        catch (error) {
            throw new Error('Error sending the request');
        }
    }
    getDefaultRequestParams() {
        return new URLSearchParams({
            'SERVICE-VERSION': '1.0.0',
            'SECURITY-APPNAME': this.appConfig.applicationId,
            'RESPONSE-DATA-FORMAT': 'JSON'
        });
    }
}
