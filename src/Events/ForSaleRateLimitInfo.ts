export class ForSaleRateLimitInfo {
    rateLimitRemainingCalls: number
    rateLimitResetDate: Date

    constructor (rateLimitRemainingCalls: number, rateLimitResetDate: Date) {
        this.rateLimitRemainingCalls = rateLimitRemainingCalls
        this.rateLimitResetDate = rateLimitResetDate
    }

    static fromJson (json: any) {
        return new ForSaleRateLimitInfo(json.rateLimitRemainingCalls, new Date(json.rateLimitResetDate))
    }
}
