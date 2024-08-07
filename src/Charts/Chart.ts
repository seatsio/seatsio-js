import { EventDeserializer } from '../Events/EventDeserializer'
import { ChartValidation } from './ChartValidation'
import { Event, EventJson } from '../Events/Event'
import { Dict } from '../Dict'
import { Zone, ZoneJson } from './Zone'

export type ChartJson = Dict<any>

export class Chart {
    archived: boolean
    draftVersionThumbnailUrl: string | null
    events: Event[]
    id: number
    key: string
    name: string
    publishedVersionThumbnailUrl: string
    status: string
    tags: string[]
    validation?: ChartValidation
    venueType?: string
    zones?: Zone[]

    constructor (chart: ChartJson) {
        this.name = chart.name
        this.id = chart.id
        this.key = chart.key
        this.status = chart.status
        this.tags = chart.tags
        this.publishedVersionThumbnailUrl = chart.publishedVersionThumbnailUrl
        this.draftVersionThumbnailUrl = chart.draftVersionThumbnailUrl || null
        this.events = chart.events ? chart.events.map((event: EventJson) => new EventDeserializer().fromJson(event)) : []
        this.archived = chart.archived
        if (chart.validation) this.validation = new ChartValidation(chart.validation)
        this.venueType = chart.venueType
        this.zones = chart.zones ? chart.zones.map((zone: ZoneJson) => Zone.fromJson(zone)) : []
    }
}
