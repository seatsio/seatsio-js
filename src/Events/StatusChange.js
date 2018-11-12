class StatusChange {
    constructor(id, eventId, status, quantity, objectLabel, date, orderId = null, extraData = null) {
        /* int */
        this.id = id;
        /* int */
        this.eventId = eventId;
        /* string */
        this.status = status;
        /* int */
        this.quantity = quantity;
        /* string */
        this.objectLabel = objectLabel;
        /* Date */
        this.date = date;
        /* string */
        this.orderId = orderId;
        /* object|[objects] */
        this.extraData = extraData;
    }
}

module.exports = StatusChange;
