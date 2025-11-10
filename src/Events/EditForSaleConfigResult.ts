import { ForSaleConfig } from './ForSaleConfig'
import { ForSaleRateLimitInfo } from './ForSaleRateLimitInfo'

export class EditForSaleConfigResult {
    forSaleConfig: ForSaleConfig
    rateLimitInfo: ForSaleRateLimitInfo

    constructor (forSaleConfig: ForSaleConfig, rateLimitInfo: ForSaleRateLimitInfo) {
        this.forSaleConfig = forSaleConfig
        this.rateLimitInfo = rateLimitInfo
    }

    static fromJson (json: any) {
        return new EditForSaleConfigResult(ForSaleConfig.fromJson(json.forSaleConfig), ForSaleRateLimitInfo.fromJson(json.rateLimitInfo))
    }
}
