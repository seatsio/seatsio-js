import { Dict } from '../Dict'

export type ChannelJson = Dict<any>

export class Channel {
    color: string
    index: number
    key: string
    name: string
    objects: string[]

    constructor (json: ChannelJson) {
        this.key = json.key
        this.name = json.name
        this.color = json.color
        this.index = json.index
        this.objects = json.objects
    }
}
