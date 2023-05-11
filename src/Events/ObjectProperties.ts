export class ObjectProperties {
    extraData: any;
    objectId: any;
    quantity: any;
    ticketType: any;
    /**
     * @param {string} objectId
     */
    constructor (objectId: any) {
    /* string */
        this.objectId = objectId
    }

    /**
     * @param {string} ticketType
     */
    setTicketType (ticketType: any) {
        this.ticketType = ticketType
        return this
    }

    /**
     * @param {number} quantity
     */
    setQuantity (quantity: any) {
        this.quantity = quantity
        return this
    }

    /**
     * @param {object} extraData
     */
    setExtraData (extraData: any) {
        this.extraData = extraData
        return this
    }
}
