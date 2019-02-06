class ObjectStatus {
  /**
   * @param {?string} status
   * @param {?string} ticketType
   * @param {?string} holdToken
   * @param {?string} orderId
   * @param {?object} extraData
   * @param {?number} quantity
   */
  constructor (status = null, ticketType = null, holdToken = null, orderId = null, extraData = null, quantity = null) {
    if (arguments.length === 0) {
      this.FREE = 'free'
      this.BOOKED = 'booked'
      this.HELD = 'reservedByToken'
    }

    this.status = typeof status !== 'undefined' && status !== null ? status : {}
    this.ticketType = typeof ticketType !== 'undefined' && ticketType !== null ? ticketType : {}
    this.holdToken = typeof holdToken !== 'undefined' && holdToken !== null ? holdToken : {}
    this.orderId = typeof orderId !== 'undefined' && orderId !== null ? orderId : {}
    this.extraData = typeof extraData !== 'undefined' && extraData !== null ? extraData : {}
    this.quantity = typeof quantity !== 'undefined' && quantity !== null ? quantity : {}
  }
}

module.exports = ObjectStatus
