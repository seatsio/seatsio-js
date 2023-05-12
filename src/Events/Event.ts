import { ForSaleConfig } from './ForSaleConfig'
import { Channel } from './Channel'
import { Category } from '../Charts/Category'

export class Event {
    categories: any
    channels: any
    chartKey: any
    createdOn: any
    forSaleConfig: any
    id: any
    isEventInSeason: any
    isPartialSeason: any
    isTopLevelSeason: any
    key: any
    objectCategories: any
    socialDistancingRulesetKey: any
    supportsBestAvailable: any
    tableBookingConfig: any
    topLevelSeasonKey: any
    updatedOn: any
    /**
     * @param {object} json
     */
    constructor (json: any) {
        this.id = json.id
        this.key = json.key
        this.tableBookingConfig = json.tableBookingConfig
        this.supportsBestAvailable = json.supportsBestAvailable
        this.forSaleConfig = json.forSaleConfig ? new ForSaleConfig(json.forSaleConfig.forSale, json.forSaleConfig.objects, json.forSaleConfig.areaPlaces, json.forSaleConfig.categories) : null
        this.chartKey = json.chartKey
        this.createdOn = json.createdOn ? new Date(json.createdOn) : null
        this.updatedOn = json.updatedOn ? new Date(json.updatedOn) : null
        this.channels = json.channels ? json.channels.map((c: any) => new Channel(c)) : null
        this.socialDistancingRulesetKey = json.socialDistancingRulesetKey
        this.topLevelSeasonKey = json.topLevelSeasonKey
        this.isTopLevelSeason = json.isTopLevelSeason
        this.isPartialSeason = json.isPartialSeason
        this.isEventInSeason = json.isEventInSeason
        this.objectCategories = json.objectCategories
        this.categories = json.categories ? json.categories.map((c: any) => Category.fromJson(c)) : null
    }

    isSeason () {
        return false
    }
}
