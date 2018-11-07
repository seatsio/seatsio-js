class StatusChange {
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
