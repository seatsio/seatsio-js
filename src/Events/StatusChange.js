class StatusChange {
    /**
     * @param {number} id
     * @param {number} eventId
     * @param {string} status
     * @param {number} quantity
     * @param {string} objectLabel
     * @param {Date} date
     * @param {string} orderId
     * @param {object} extraData
     */
    constructor(id, eventId, status, quantity, objectLabel, date, orderId = null, extraData = null) {
        this.id = id;
        this.eventId = eventId;
        this.status = status;
        this.quantity = quantity;
        this.objectLabel = objectLabel;
        this.date = date;
        this.orderId = orderId;
        this.extraData = extraData;
    }
}

module.exports = StatusChange;
