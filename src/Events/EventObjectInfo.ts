import { HelperFunctions } from '../utilities/helperFunctions'
import { IDs } from '../Common/IDs'

export class EventObjectInfo {

    static FREE = 'free'
    static BOOKED = 'booked'
    static HELD = 'reservedByToken'


    availabilityReason: any;
    bookAsAWhole: any;
    capacity: any;
    categoryKey: any;
    categoryLabel: any;
    channel: any;
    displayedObjectType: any;
    distanceToFocalPoint: any;
    entrance: any;
    extraData: any;
    forSale: any;
    hasRestrictedView: any;
    holdToken: any;
    holds: any;
    ids: any;
    isAccessible: any;
    isAvailable: any;
    isCompanionSeat: any;
    isDisabledBySocialDistancing: any;
    label: any;
    labels: any;
    leftNeighbour: any;
    numBooked: any;
    numFree: any;
    numHeld: any;
    numSeats: any;
    objectType: any;
    orderId: any;
    rightNeighbour: any;
    section: any;
    status: any;
    ticketType: any;

    constructor (report: any) {
        this.label = report.label
        this.labels = HelperFunctions.labelCreator(report)
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

