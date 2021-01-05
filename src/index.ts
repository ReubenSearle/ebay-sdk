import { AppConfig } from './types/appConfig.js'

export default class eBaySDK {
  public readonly appConfig: AppConfig

  constructor (appConfig: AppConfig) {
    this.appConfig = appConfig
  }
}
