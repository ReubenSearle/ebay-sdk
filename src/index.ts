import { AppConfig } from './types/appConfig.js'

export class eBaySDK {
  public readonly appConfig: AppConfig

  constructor (appConfig: AppConfig) {
    this.appConfig = appConfig
  }
}
