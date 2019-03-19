class StatusChange {
  /**
   * @param {number} id
   * @param {number} eventId
   * @param {string} status
   * @param {number} quantity
   * @param {string} objectLabel
   * @param {Date} date
   * @param {?string} orderId
   * @param {?object} extraData
   * @param {?string} holdToken
   * @param {object} statusChange
   */
  constructor (statusChange) {
    this.id = statusChange.id
    this.eventId = statusChange.eventId
    this.status = statusChange.status
    this.quantity = statusChange.quantity
    this.objectLabel = statusChange.objectLabel
    this.date = new Date(statusChange.date)
    this.orderId = statusChange.orderId ? statusChange.orderId : null
    this.extraData = statusChange.extraData ? statusChange.extraData : null
    this.holdToken = statusChange.holdToken ? statusChange.holdToken : null
  }
}

module.exports = StatusChange
