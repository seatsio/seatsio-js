const helperFunctions = require('../utilities/helperFunctions.js')

class EventReportItem {
    /**
     * @param {object} report
     */
    constructor (report) {
        this.label = report.label
        this.labels = helperFunctions.labelCreator(report)
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
        this.numFree = report.numFree
        this.numHeld = report.numHeld
        this.extraData = report.extraData
        this.isAccessible = report.isAccessible
        this.isCompanionSeat = report.isCompanionSeat
        this.hasRestrictedView = report.hasRestrictedView
        this.displayedObjectType = report.displayedObjectType
    }
}

module.exports = EventReportItem
