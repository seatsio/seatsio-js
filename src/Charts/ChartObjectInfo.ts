import { HelperFunctions } from '../utilities/helperFunctions'
import { IDs } from '../Common/IDs'
import { Labels } from '../Common/Labels'
import { Dict } from '../Dict'
import { Floor } from '../Common/Floor'

export type ChartObjectInfoJson = Dict<any>

export class ChartObjectInfo {
    bookAsAWhole?: boolean
    capacity?: number
    categoryKey?: string
    categoryLabel: string
    distanceToFocalPoint?: number
    entrance?: string
    ids: IDs
    label: string
    labels: Labels
    leftNeighbour?: string
    numSeats?: number
    objectType: string
    rightNeighbour?: string
    section?: string
    isAccessible?: boolean
    isCompanionSeat?: boolean
    hasLiftUpArmrests?: boolean
    isHearingImpaired?: boolean
    isSemiAmbulatorySeat?: boolean
    hasSignLanguageInterpretation?: boolean
    isPlusSize?: boolean
    hasRestrictedView?: boolean
    zone?: string
    floor?: Floor

    constructor (json: ChartObjectInfoJson) {
        this.label = json.label
        this.labels = HelperFunctions.labelCreator(json)
        this.ids = new IDs(json.ids.own, json.ids.parent, json.ids.section)
        this.categoryLabel = json.categoryLabel
        this.categoryKey = json.categoryKey
        this.entrance = json.entrance
        this.objectType = json.objectType
        this.section = json.section
        this.capacity = json.capacity
        this.bookAsAWhole = json.bookAsAWhole
        this.leftNeighbour = json.leftNeighbour
        this.rightNeighbour = json.rightNeighbour
        this.distanceToFocalPoint = json.distanceToFocalPoint
        this.numSeats = json.numSeats
        this.isAccessible = json.isAccessible
        this.isCompanionSeat = json.isCompanionSeat
        this.hasLiftUpArmrests = json.hasLiftUpArmrests
        this.isHearingImpaired = json.isHearingImpaired
        this.isSemiAmbulatorySeat = json.isSemiAmbulatorySeat
        this.hasSignLanguageInterpretation = json.hasSignLanguageInterpretation
        this.isPlusSize = json.isPlusSize
        this.hasRestrictedView = json.hasRestrictedView
        this.zone = json.zone
        this.floor = json.floor ? new Floor(json.floor.name, json.floor.displayName) : undefined
    }
}
