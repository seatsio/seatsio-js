const helperFunctions = require('../utilities/helperFunctions.js')
const { IDs } = require('../Common/IDs')

class EventObjectInfo {
    /**
     * @param {object} report
     */
    constructor (report) {
        this.label = report.label
        this.labels = helperFunctions.labelCreator(report)
        this.ids = new IDs(report.ids.own, report.ids.parent, report.ids.section)
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
        this.bookAsAWhole = report.bookAsAWhole
        this.numBooked = report.numBooked
        this.numFree = report.numFree
        this.numHeld = report.numHeld
        this.extraData = report.extraData
        this.isAccessible = report.isAccessible
        this.isCompanionSeat = report.isCompanionSeat
        this.hasRestrictedView = report.hasRestrictedView
        this.displayedObjectType = report.displayedObjectType
        this.leftNeighbour = report.leftNeighbour
        this.rightNeighbour = report.rightNeighbour
        this.isAvailable = report.isAvailable
        this.availabilityReason = report.availabilityReason
        this.isDisabledBySocialDistancing = report.isDisabledBySocialDistancing
        this.channel = report.channel
        this.distanceToFocalPoint = report.distanceToFocalPoint
        this.holds = report.holds
        this.numSeats = report.numSeats
    }
}

EventObjectInfo.FREE = 'free'
EventObjectInfo.BOOKED = 'booked'
EventObjectInfo.HELD = 'reservedByToken'

module.exports = EventObjectInfo
