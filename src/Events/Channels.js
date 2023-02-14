class Channels {
    /**
     * @param {Axios} client
     */
    constructor (client) {
        this.client = client
    }

    add (eventKey, channelKey, name, color, index, objects) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels`, {
            key: channelKey,
            name,
            color,
            index,
            objects
        })
    }

    addMultiple (eventKey, channelCreationParams) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels`, channelCreationParams)
    }

    remove (eventKey, channelKey) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}`)
    }

    update (eventKey, channelKey, newChannelName, newColor, newObjects) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}`, {
            name: newChannelName,
            color: newColor,
            objects: newObjects
        })
    }

    addObjects (eventKey, channelKey, objects) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}/objects`, {
            objects
        })
    }

    removeObjects (eventKey, channelKey, objects) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}/channels/${encodeURIComponent(channelKey)}/objects`, {
            data: { objects }
        })
    }

    replace (eventKey, channels) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/update`, { channels })
    }

    setObjects (eventKey, channelConfig) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/assign-objects`, { channelConfig })
    }
}

module.exports = Channels
