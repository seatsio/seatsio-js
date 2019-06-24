class ObjectStatus {
    /**
   * @param {object} objStatus
   */
    constructor (objStatus = null) {
        if (arguments.length === 0) {
            this.FREE = 'free'
            this.BOOKED = 'booked'
            this.HELD = 'reservedByToken'
        }

        if (objStatus !== null) {
            this.status = objStatus.status ? objStatus.status : {}
            this.ticketType = objStatus.ticketType ? objStatus.ticketType : {}
            this.holdToken = objStatus.holdToken ? objStatus.holdToken : {}
            this.orderId = objStatus.orderId ? objStatus.orderId : {}
            this.extraData = objStatus.extraData ? objStatus.extraData : {}
            this.quantity = objStatus.quantity ? objStatus.quantity : {}
        }
    }
}

module.exports = ObjectStatus
