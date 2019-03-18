class EventReportItem {
  /**
   * @param {object} report
   */
  constructor (report, labels) {
    this.label = report.label
    this.labels = labels
    this.status = report.status
    this.categoryLabel = report.categoryLabel
    this.categoryKey = report.categoryKey
    this.ticketType = report.ticketType
    this.entrance = report.entrance
    this.objectType = report.objectType
    this.section = report.section
    this.orderId = report.orderId
    this.forSale = report.forSale
    this.holdToken = report.holdToken
    this.capacity = report.capacity
    this.numBooked = report.numBooked
    this.extraData = report.extraData
  }
}

module.exports = EventReportItem
