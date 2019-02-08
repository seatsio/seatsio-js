class EventReportItem {
  /**
   * @param {string} label
   * @param {Labels} labels
   * @param {string}status
   * @param {string} categoryLabel
   * @param {string} categoryKey
   * @param {string} ticketType
   * @param {string} entrance
   * @param {string} objectType
   * @param {string} section
   * @param {string} orderId
   * @param {boolean} forSale
   * @param {string} holdToken
   * @param {number} capacity
   * @param {number} numBooked
   * @param {object} extraData
   */
  constructor (label, labels, status, categoryLabel, categoryKey, ticketType,
    entrance, objectType, section, orderId, forSale, holdToken,
    capacity, numBooked, extraData) {
    this.label = label
    this.labels = labels
    this.status = status
    this.categoryLabel = categoryLabel
    this.categoryKey = categoryKey
    this.ticketType = ticketType
    this.entrance = entrance
    this.objectType = objectType
    this.section = section
    this.orderId = orderId
    this.forSale = forSale
    this.holdToken = holdToken
    this.capacity = capacity
    this.numBooked = numBooked
    this.extraData = extraData
  }
}

module.exports = EventReportItem
