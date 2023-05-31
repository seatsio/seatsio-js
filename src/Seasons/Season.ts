import { Event, EventJson } from '../Events/Event'
import { Dict } from '../Dict'

export type SeasonJson = Dict<any>

export class Season extends Event {
    events?: Event[]
    partialSeasonKeys: string[]

    constructor (season: SeasonJson) {
        super(season)
        this.partialSeasonKeys = season.partialSeasonKeys
        this.events = season.events ? season.events.map((e: EventJson) => new Event(e)) : undefined
    }

    isSeason () {
        return true
    }
}
