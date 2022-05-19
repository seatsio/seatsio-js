const ForSaleConfig = require('./ForSaleConfig.js')
const Channel = require('./Channel.js')
const Category = require('../Charts/Category')

class Event {
    /**
     * @param {object} json
     */
    constructor (json) {
        this.id = json.id
        this.key = json.key
        this.tableBookingConfig = json.tableBookingConfig
        this.supportsBestAvailable = json.supportsBestAvailable
        this.forSaleConfig = json.forSaleConfig ? new ForSaleConfig(json.forSaleConfig.forSale, json.forSaleConfig.objects, json.forSaleConfig.categories) : null
        this.chartKey = json.chartKey
        this.createdOn = json.createdOn ? new Date(json.createdOn) : null
        this.updatedOn = json.updatedOn ? new Date(json.updatedOn) : null
        this.channels = json.channels ? json.channels.map(c => new Channel(c)) : null
        this.socialDistancingRulesetKey = json.socialDistancingRulesetKey
        this.topLevelSeasonKey = json.topLevelSeasonKey
        this.isTopLevelSeason = json.isTopLevelSeason
        this.isPartialSeason = json.isPartialSeason
        this.isEventInSeason = json.isEventInSeason
        this.objectCategories = json.objectCategories
        this.categories = json.categories ? json.categories.map(c => Category.fromJson(c)) : null
    }

    isSeason () {
        return false
    }
}

module.exports = Event
