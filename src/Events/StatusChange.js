class StatusChange {
    constructor(id, eventId, status, quantity, objectLabel, date, orderId = null, extraData = null) {
        this.id = id; /* int */
        this.eventId = eventId; /* int */
        this.status = status; /* string */
        this.quantity = quantity; /* int */
        this.objectLabel = objectLabel; /* string */
        this.date = date; /* Date obj*/
        this.orderId = orderId; /* string */
        this.extraData = extraData; /* obj */
    }
}
module.exports = StatusChange;
