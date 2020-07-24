class StatusChangeRequest {
    /**
     * @param {string} eventKey
     * @param {object|object[]} objectOrObjects
     * @param {string} status
     * @param {?string} holdToken
     * @param {?string} orderId
     * @param {?boolean} keepExtraData
     * @param {?boolean} ignoreChannels
     * @param {?string[]} channelKeys
     */
    constructor (eventKey, objectOrObjects, status, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys) {
        this.eventKey = eventKey
        this.objectOrObjects = objectOrObjects
        this.status = status
        this.holdToken = holdToken
        this.orderId = orderId
        this.keepExtraData = keepExtraData
        this.ignoreChannels = ignoreChannels
        this.channelKeys = channelKeys
    }
}

module.exports = StatusChangeRequest
