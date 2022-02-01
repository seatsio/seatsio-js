class SeasonParams {
    key (key) {
        this._key = key
        return this
    }

    numberOfEvents (numberOfEvents) {
        this._numberOfEvents = numberOfEvents
        return this
    }

    eventKeys (eventKeys) {
        this._eventKeys = eventKeys
        return this
    }

    tableBookingConfig (tableBookingConfig) {
        this._tableBookingConfig = tableBookingConfig
        return this
    }

    socialDistancingRulesetKey (socialDistancingRulesetKey) {
        this._socialDistancingRulesetKey = socialDistancingRulesetKey
        return this
    }
}

module.exports = SeasonParams
