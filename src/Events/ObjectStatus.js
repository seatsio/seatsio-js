class ObjectStatus {
    /**
     * @param {object} objStatus
     */
    constructor (objStatus) {
        this.status = objStatus.status
        this.ticketType = objStatus.ticketType
        this.holdToken = objStatus.holdToken
        this.orderId = objStatus.orderId
        this.extraData = objStatus.extraData
        this.quantity = objStatus.quantity
        this.forSale = objStatus.forSale
    }
}

ObjectStatus.FREE = 'free'
ObjectStatus.BOOKED = 'booked'
ObjectStatus.HELD = 'reservedByToken'

module.exports = ObjectStatus
