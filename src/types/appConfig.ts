import marketplaceIdEnum from '../config/marketplaceIdEnum.js'

export type AppConfig = {
  applicationId: string,
  marketplaceId?: marketplaceIdEnum,
  sandbox?: boolean
}
