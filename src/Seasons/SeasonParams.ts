export class SeasonParams {
    _eventKeys: any
    _key: any
    _numberOfEvents: any
    _socialDistancingRulesetKey: any
    _tableBookingConfig: any
    key (key: any) {
        this._key = key
        return this
    }

    numberOfEvents (numberOfEvents: any) {
        this._numberOfEvents = numberOfEvents
        return this
    }

    eventKeys (eventKeys: any) {
        this._eventKeys = eventKeys
        return this
    }

    tableBookingConfig (tableBookingConfig: any) {
        this._tableBookingConfig = tableBookingConfig
        return this
    }

    socialDistancingRulesetKey (socialDistancingRulesetKey: any) {
        this._socialDistancingRulesetKey = socialDistancingRulesetKey
        return this
    }
}
