class EventReportItem {
    constructor(label, labels, status, categoryLabel, categoryKey, ticketType,
                entrance, objectType, section, orderId, forSale, holdToken,
                capacity, numBooked, extraData) {
        /* string */
        this.label = label;
        /* Common/Label */
        this.labels = labels;
        /* string */
        this.status = status;
        /* string */
        this.categoryLabel = categoryLabel;
        /* string */
        this.categoryKey = categoryKey;
        /* string */
        this.ticketType = ticketType;
        /* string */
        this.entrance = entrance;
        /* string */
        this.objectType = objectType;
        /* string */
        this.section = section;
        /* string */
        this.orderId = orderId;
        /* boolean*/
        this.forSale = forSale;
        /* string */
        this.holdToken = holdToken;
        /* int */
        this.capacity = capacity;
        /* int */
        this.numBooked = numBooked;
        /* object */
        this.extraData = extraData;
    }
}

module.exports = EventReportItem;