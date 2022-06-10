class Channels {
    /**
     * @param {Axios} client
     */
    constructor (client) {
        this.client = client
    }

    replace (eventKey, channels) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/update`, { channels: channels })
    }

    setObjects (eventKey, channelConfig) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/channels/assign-objects`, { channelConfig: channelConfig })
    }
}

module.exports = Channels
