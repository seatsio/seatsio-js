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

    typeof status !== 'undefined' && status !== null ? this.status = status : {}
    typeof ticketType !== 'undefined' && ticketType !== null ? this.ticketType = ticketType : {}
    typeof holdToken !== 'undefined' && holdToken !== null ? this.holdToken = holdToken : {}
    typeof orderId !== 'undefined' && orderId !== null ? this.orderId = orderId : {}
    typeof extraData !== 'undefined' && extraData !== null ? this.extraData = extraData : {}
    typeof quantity !== 'undefined' && quantity !== null ? this.quantity = quantity : {}
  }
}

module.exports = ObjectStatus
