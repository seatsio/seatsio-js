export class Channels {
    client: any;
    /**
     * @param {Axios} client
     */
    constructor (client: any) {
        this.client = client
    }

    add (eventKey: any, channelKey: any, name: any, color: any, index: any, objects: any) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels`, {
            key: channelKey,
            name,
            color,
            index,
            objects
        })
    }

    addMultiple (eventKey: any, channelCreationParams: any) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels`, channelCreationParams)
    }

    remove (eventKey: any, channelKey: any) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}`)
    }

    update (eventKey: any, channelKey: any, newChannelName: any, newColor: any, newObjects: any) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}`, {
            name: newChannelName,
            color: newColor,
            objects: newObjects
        })
    }

    addObjects (eventKey: any, channelKey: any, objects: any) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}/objects`, {
            objects
        })
    }

    removeObjects (eventKey: any, channelKey: any, objects: any) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}/objects`, {
            data: { objects }
        })
    }

    replace (eventKey: any, channels: any) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/update`, { channels })
    }

    setObjects (eventKey: any, channelConfig: any) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/assign-objects`, { channelConfig })
    }
}
