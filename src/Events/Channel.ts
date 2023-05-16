export class Channel {
    color: any
    index: any
    key: any
    name: any
    objects: any

    constructor (channel: any) {
        this.key = channel.key
        this.name = channel.name
        this.color = channel.color
        this.index = channel.index
        this.objects = channel.objects
    }
}
