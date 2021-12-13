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
     * @param {?string[]} allowedPreviousStatuses
     * @param {?string[]} rejectedPreviousStatuses
     */
    constructor (eventKey, objectOrObjects, status, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, allowedPreviousStatuses, rejectedPreviousStatuses) {
        this.eventKey = eventKey
        this.objectOrObjects = objectOrObjects
        this.status = status
        this.holdToken = holdToken
        this.orderId = orderId
        this.keepExtraData = keepExtraData
        this.ignoreChannels = ignoreChannels
        this.channelKeys = channelKeys
        this.allowedPreviousStatuses = allowedPreviousStatuses
        this.rejectedPreviousStatuses = rejectedPreviousStatuses
    }
}

module.exports = StatusChangeRequest
