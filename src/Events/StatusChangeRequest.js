class StatusChangeRequest {
    /**
     * @param {string} eventKey
     * @param {object[]} objects
     * @param {string} status
     * @param {?string} holdToken
     * @param {?string} orderId
     * @param {?boolean} keepExtraData
     */
    constructor (eventKey, objects, status, holdToken, orderId, keepExtraData) {
        this.eventKey = eventKey
        this.objects = objects
        this.status = status
        this.holdToken = holdToken
        this.orderId = orderId
        this.keepExtraData = keepExtraData
    }
}

module.exports = StatusChangeRequest
