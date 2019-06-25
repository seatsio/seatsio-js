class ObjectProperties {
    /**
     * @param {string} objectId
     */
    constructor (objectId) {
    /* string */
        this.objectId = objectId
    }

    /**
     * @param {string} ticketType
     */
    setTicketType (ticketType) {
        this.ticketType = ticketType
        return this
    }

    /**
     * @param {number} quantity
     */
    setQuantity (quantity) {
        this.quantity = quantity
        return this
    }

    /**
     * @param {object} extraData
     */
    setExtraData (extraData) {
        this.extraData = extraData
        return this
    }
}

module.exports = ObjectProperties
