import { Axios } from 'axios'
import { ChannelCreationParams } from './Channel'
import { Dict } from '../Dict'

export class Channels {
    client: Axios

    constructor (client: Axios) {
        this.client = client
    }

    add (eventKey: string, channelKey: string, name: string, color: string | undefined, index: number | undefined, objects: string[] | undefined, areaPlaces: Dict<number> | undefined = undefined) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels`, {
            key: channelKey,
            name,
            color,
            index,
            objects,
            areaPlaces
        })
    }

    addMultiple (eventKey: string, channelCreationParams: ChannelCreationParams[]) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels`, channelCreationParams)
    }

    remove (eventKey: string, channelKey: string) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}`)
    }

    update (eventKey: string, channelKey: string, newChannelName: string | undefined, newColor: string | undefined, newObjects: string[] | undefined, newAreaPlaces: Dict<number> | undefined = undefined) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}`, {
            name: newChannelName,
            color: newColor,
            objects: newObjects,
            areaPlaces: newAreaPlaces
        })
    }

    addObjects (eventKey: string, channelKey: string, objects: string[], areaPlaces: Dict<number> | undefined = undefined) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}/objects`, {
            objects,
            areaPlaces
        })
    }

    removeObjects (eventKey: string, channelKey: string, objects: string[], areaPlaces: Dict<number> | undefined = undefined) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}/objects`, {
            data: { objects, areaPlaces }
        })
    }

    replace (eventKey: string, channels: ChannelCreationParams[]) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/replace`, { channels })
    }
}
