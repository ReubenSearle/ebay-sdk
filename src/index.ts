import { AppConfig } from './types/appConfig.js'
import FindingApi from './api/findingApi.js'
import Request from './utils/request.js'

export default class eBaySDK {
  private readonly appConfig: AppConfig
  private readonly request: Request
  private _finding?: FindingApi

  constructor (appConfig: AppConfig) {
    this.appConfig = appConfig
    this.request = new Request(this.appConfig)
  }

  get finding (): FindingApi {
    return this._finding || (this._finding = new FindingApi(this.appConfig, this.request))
  }
}
