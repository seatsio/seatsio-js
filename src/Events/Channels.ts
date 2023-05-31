import { Axios } from 'axios'

export class Channels {
    client: Axios

    constructor (client: Axios) {
        this.client = client
    }

    add (eventKey: string, channelKey: string, name: string, color: string | undefined, index: number | undefined, objects: string[] | undefined) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels`, {
            key: channelKey,
            name,
            color,
            index,
            objects
        })
    }

    addMultiple (eventKey: string, channelCreationParams: any) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels`, channelCreationParams)
    }

    remove (eventKey: string, channelKey: string) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}`)
    }

    update (eventKey: string, channelKey: string, newChannelName: any, newColor: any, newObjects: any) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}`, {
            name: newChannelName,
            color: newColor,
            objects: newObjects
        })
    }

    addObjects (eventKey: string, channelKey: string, objects: string[]) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}/objects`, {
            objects
        })
    }

    removeObjects (eventKey: string, channelKey: string, objects: string[]) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}/objects`, {
            data: { objects }
        })
    }

    replace (eventKey: string, channels: any) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/replace`, { channels })
    }
}
