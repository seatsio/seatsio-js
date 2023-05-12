import { Event } from '../Events/Event'

export class Season extends Event {
    events: any
    partialSeasonKeys: any

    constructor (season: any) {
        super(season)
        this.partialSeasonKeys = season.partialSeasonKeys
        this.events = season.events ? season.events.map((e: any) => new Event(e)) : undefined
    }

    isSeason () {
        return true
    }
}
