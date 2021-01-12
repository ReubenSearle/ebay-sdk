import { AppConfig } from './types/appConfig.js'
import marketplaceIdEnum from './config/marketplaceIdEnum.js'
import FindingApi from './api/findingApi.js'
import Request from './utils/request.js'

const defaultAppConfig = {
  marketPlaceId: marketplaceIdEnum.DEFAULT,
  sandbox: false
}

export default class eBaySDK {
  private readonly appConfig: AppConfig
  private readonly request: Request
  private _finding?: FindingApi

  constructor (appConfig: AppConfig) {
    this.appConfig = { ...defaultAppConfig, ...appConfig }
    this.request = new Request(this.appConfig)
  }

  get finding (): FindingApi {
    return this._finding || (this._finding = new FindingApi(this.request))
  }
}
