const ForSaleConfig = require('./ForSaleConfig.js')
const Channel = require('./Channel.js')

class Event {
    /**
     * @param {object} event
     */
    constructor (event) {
        this.id = event.id
        this.key = event.key
        this.tableBookingConfig = event.tableBookingConfig
        this.supportsBestAvailable = event.supportsBestAvailable
        this.forSaleConfig = event.forSaleConfig ? new ForSaleConfig(event.forSaleConfig.forSale, event.forSaleConfig.objects, event.forSaleConfig.categories) : null
        this.chartKey = event.chartKey
        this.createdOn = event.createdOn ? new Date(event.createdOn) : null
        this.updatedOn = event.updatedOn ? new Date(event.updatedOn) : null
        this.channels = event.channels ? event.channels.map(c => new Channel(c)) : null
        this.socialDistancingRulesetKey = event.socialDistancingRulesetKey
    }
}

module.exports = Event
