import { HelperFunctions } from '../utilities/helperFunctions'
import { IDs } from '../Common/IDs'

export class ChartObjectInfo {
    bookAsAWhole: any
    capacity: any
    categoryKey: any
    categoryLabel: any
    distanceToFocalPoint: any
    entrance: any
    ids: any
    label: any
    labels: any
    leftNeighbour: any
    numSeats: any
    objectType: any
    rightNeighbour: any
    section: any

    constructor (chartReport: any) {
        this.label = chartReport.label
        this.labels = HelperFunctions.labelCreator(chartReport)
        this.ids = new IDs(chartReport.ids.own, chartReport.ids.parent, chartReport.ids.section)
        this.categoryLabel = chartReport.categoryLabel
        this.categoryKey = chartReport.categoryKey
        this.entrance = chartReport.entrance
        this.objectType = chartReport.objectType
        this.section = chartReport.section
        this.capacity = chartReport.capacity
        this.bookAsAWhole = chartReport.bookAsAWhole
        this.leftNeighbour = chartReport.leftNeighbour
        this.rightNeighbour = chartReport.rightNeighbour
        this.distanceToFocalPoint = chartReport.distanceToFocalPoint
        this.numSeats = chartReport.numSeats
    }
}
