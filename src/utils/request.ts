import fetch from 'node-fetch'
import { AppConfig } from '../types/appConfig.js'

export default class Request {
  private readonly appConfig: AppConfig

  constructor (appConfig: AppConfig) {
    this.appConfig = appConfig
  }

  async send (baseUrl: String, params: URLSearchParams) {
    try {
      const defaultParams = this.getDefaultRequestParams()
      const url = `${baseUrl}?${((params.toString()))}&${defaultParams.toString()}`
      const response = await fetch(url)
      return response.json()
    } catch (error) {
      throw new Error('Failed to build the eBay API request')
    }
  }

  private getDefaultRequestParams (): URLSearchParams {
    return new URLSearchParams({
      'SERVICE-VERSION': '1.0.0',
      'SECURITY-APPNAME': this.appConfig.applicationId,
      'RESPONSE-DATA-FORMAT': 'JSON'
    })
  }
}
