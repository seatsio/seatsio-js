class StatusChangeRequest {
    /**
     * @param {string} eventKey
     * @param {object|object[]} objectOrObjects
     * @param {string} status
     * @param {?string} holdToken
     * @param {?string} orderId
     * @param {?boolean} keepExtraData
     */
    constructor (eventKey, objectOrObjects, status, holdToken, orderId, keepExtraData) {
        this.eventKey = eventKey
        this.objectOrObjects = objectOrObjects
        this.status = status
        this.holdToken = holdToken
        this.orderId = orderId
        this.keepExtraData = keepExtraData
    }
}

module.exports = StatusChangeRequest
