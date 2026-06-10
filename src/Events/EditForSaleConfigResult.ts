import { ForSaleConfig } from './ForSaleConfig.js'
import { ForSaleRateLimitInfo } from './ForSaleRateLimitInfo.js'

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
