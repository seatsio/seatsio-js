import { ForSaleConfig } from './ForSaleConfig'
import { Channel, ChannelJson } from './Channel'
import { Category } from '../Charts/Category'
import { TableBookingConfig } from './TableBookingConfig'
import { Dict } from '../Dict'
import { LocalDate } from '../LocalDate'

export type EventJson = Dict<any>

export class Event {
    categories: Category[] | null
    channels: Channel[] | null
    chartKey: string
    createdOn: Date | null
    forSaleConfig: null | ForSaleConfig
    id: number
    isEventInSeason: boolean
    isPartialSeason: boolean
    isTopLevelSeason: boolean
    key: string
    objectCategories?: Map<string, any>
    socialDistancingRulesetKey?: string
    supportsBestAvailable: boolean
    tableBookingConfig: TableBookingConfig
    topLevelSeasonKey?: string
    updatedOn: Date | null
    name: string | null
    date: LocalDate | null
    isInThePast: boolean

    constructor (json: EventJson) {
        this.id = json.id
        this.key = json.key
        this.tableBookingConfig = json.tableBookingConfig
        this.supportsBestAvailable = json.supportsBestAvailable
        this.forSaleConfig = json.forSaleConfig ? new ForSaleConfig(json.forSaleConfig!.forSale, json.forSaleConfig!.objects, json.forSaleConfig!.areaPlaces, json.forSaleConfig!.categories) : null
        this.chartKey = json.chartKey
        this.createdOn = json.createdOn ? new Date(json.createdOn) : null
        this.updatedOn = json.updatedOn ? new Date(json.updatedOn) : null
        this.channels = json.channels ? json.channels.map((c: ChannelJson) => new Channel(c)) : null
        this.socialDistancingRulesetKey = json.socialDistancingRulesetKey
        this.topLevelSeasonKey = json.topLevelSeasonKey
        this.isTopLevelSeason = json.isTopLevelSeason
        this.isPartialSeason = json.isPartialSeason
        this.isEventInSeason = json.isEventInSeason
        this.objectCategories = json.objectCategories
        this.categories = json.categories ? json.categories!.map((c: ChannelJson) => Category.fromJson(c)) : null
        this.name = json.name || null
        this.date = json.date ? LocalDate.parse(json.date) : null
        this.isInThePast = json.isInThePast
    }

    isSeason () {
        return false
    }
}
