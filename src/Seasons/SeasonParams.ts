import { TableBookingConfig } from '../Events/TableBookingConfig'
import { Channel } from '../Events/Channel'
import { ForSaleConfig } from '../Events/ForSaleConfig'

export class SeasonParams {
    _eventKeys?: string[]
    _key?: string
    _name?: string
    _numberOfEvents?: number
    _tableBookingConfig?: TableBookingConfig
    _channels?: Channel[]
    _forSaleConfig?: ForSaleConfig

    key (key: string) {
        this._key = key
        return this
    }

    name (name: string) {
        this._name = name
        return this
    }

    numberOfEvents (numberOfEvents: number) {
        this._numberOfEvents = numberOfEvents
        return this
    }

    eventKeys (eventKeys: string[]) {
        this._eventKeys = eventKeys
        return this
    }

    tableBookingConfig (tableBookingConfig: TableBookingConfig) {
        this._tableBookingConfig = tableBookingConfig
        return this
    }

    channels (channels: Channel[]) {
        this._channels = channels
        return this
    }

    forSaleConfig (forSaleConfig: ForSaleConfig) {
        this._forSaleConfig = forSaleConfig
        return this
    }
}
