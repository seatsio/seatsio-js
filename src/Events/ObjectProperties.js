class ObjectProperties {
    constructor(objectId) {
        /* string */
        this.objectId = objectId;
    }

    setTicketType(ticketType) {
        /* string */
        this.ticketType = ticketType;
        return this;
    }

    setQuantity(quantity) {
        /* int */
        this.quantity = quantity;
        return this;
    }

    setExtraData(extraData) {
        /* object|array */
        this.extraData = extraData;
        return this;
    }
}

module.exports = ObjectProperties;
