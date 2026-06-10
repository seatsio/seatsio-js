import { Dict } from '../Dict.js'

export type ChannelJson = Dict<any>

export interface ChannelCreationParams {
    key: string
    name: string
    color?: string
    index?: number
    objects?: string[]
    areaPlaces?: Dict<number>
}

export class Channel {
    readonly id: string
    color: string
    index: number
    key: string
    name: string
    objects: string[]
    areaPlaces: Dict<number>

    constructor (json: ChannelJson) {
        this.id = json.id
        this.key = json.key
        this.name = json.name
        this.color = json.color
        this.index = json.index
        this.objects = json.objects
        this.areaPlaces = json.areaPlaces
    }

    areaPartitionLabel (areaLabel: string): string {
        return `${areaLabel}##${this.id}`
    }
}
