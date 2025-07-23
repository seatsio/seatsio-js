import { HelperFunctions } from '../utilities/helperFunctions'
import { IDs } from '../Common/IDs'
import { Labels } from '../Common/Labels'
import { Dict } from '../Dict'
import { Floor } from '../Common/Floor'

export type EventObjectInfoJson = Dict<any>

export class EventObjectInfo {
    static FREE = 'free'
    static BOOKED = 'booked'
    static HELD = 'reservedByToken'
    static RESALE = 'resale'

    availabilityReason: string
    bookAsAWhole?: boolean
    capacity?: number
    categoryKey?: string
    categoryLabel?: string
    channel?: string
    displayedObjectType?: string
    parentDisplayedObjectType?: string
    distanceToFocalPoint?: number
    entrance?: string
    extraData?: object
    forSale: boolean
    hasRestrictedView?: boolean
    holdToken?: string
    holds?: object
    ids: IDs
    isAccessible?: boolean
    isAvailable: boolean
    isCompanionSeat?: boolean
    label: string
    labels: Labels
    leftNeighbour?: string
    numBooked?: number
    numFree?: number
    numHeld?: number
    numSeats?: number
    objectType: string
    orderId?: string
    rightNeighbour?: string
    section?: string
    status: string
    ticketType?: string
    variableOccupancy?: boolean
    minOccupancy?: number
    maxOccupancy?: number
    seasonStatusOverriddenQuantity: number
    numNotForSale?: number
    zone?: string
    floor?: Floor
    resaleListingId?: string

    constructor (json: EventObjectInfoJson) {
        this.label = json.label
        this.labels = HelperFunctions.labelCreator(json)
        this.ids = new IDs(json.ids.own, json.ids.parent, json.ids.section)
        this.status = json.status
        this.categoryLabel = json.categoryLabel
        this.categoryKey = json.categoryKey
        this.ticketType = json.ticketType
        this.entrance = json.entrance
        this.objectType = json.objectType
        this.section = json.section
        this.orderId = json.orderId
        this.forSale = json.forSale
        this.holdToken = json.holdToken
        this.capacity = json.capacity
        this.bookAsAWhole = json.bookAsAWhole
        this.numBooked = json.numBooked
        this.numFree = json.numFree
        this.numHeld = json.numHeld
        this.numNotForSale = json.numNotForSale
        this.extraData = json.extraData
        this.isAccessible = json.isAccessible
        this.isCompanionSeat = json.isCompanionSeat
        this.hasRestrictedView = json.hasRestrictedView
        this.displayedObjectType = json.displayedObjectType
        this.parentDisplayedObjectType = json.parentDisplayedObjectType
        this.leftNeighbour = json.leftNeighbour
        this.rightNeighbour = json.rightNeighbour
        this.isAvailable = json.isAvailable
        this.availabilityReason = json.availabilityReason
        this.channel = json.channel
        this.distanceToFocalPoint = json.distanceToFocalPoint
        this.holds = json.holds
        this.numSeats = json.numSeats
        this.variableOccupancy = json.variableOccupancy
        this.minOccupancy = json.minOccupancy
        this.maxOccupancy = json.maxOccupancy
        this.seasonStatusOverriddenQuantity = json.seasonStatusOverriddenQuantity
        this.zone = json.zone
        this.floor = json.floor ? new Floor(json.floor.name, json.floor.displayName) : undefined
        this.resaleListingId = json.resaleListingId
    }
}
