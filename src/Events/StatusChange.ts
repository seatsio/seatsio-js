import { StatusChangeOrigin } from './StatusChangeOrigin'
import { Dict } from '../Dict'

export type StatusChangeJson = Dict<any>

export class StatusChange {
    date: Date
    displayedLabel: string | null
    eventId: number
    extraData: object | null
    holdToken: string | null
    id: string
    isPresentOnChart: boolean
    notPresentOnChartReason?: string
    objectLabel: string
    orderId: string | null
    origin: StatusChangeOrigin
    quantity: number | undefined
    status: string

    constructor (json: StatusChangeJson) {
        this.id = json.id
        this.eventId = json.eventId
        this.status = json.status
        this.quantity = json.quantity
        this.objectLabel = json.objectLabel
        this.date = new Date(json.date)
        this.orderId = json.orderId ? json.orderId : null
        this.extraData = json.extraData ? json.extraData : null
        this.holdToken = json.holdToken ? json.holdToken : null
        this.origin = json.origin
        this.isPresentOnChart = json.isPresentOnChart
        this.notPresentOnChartReason = json.notPresentOnChartReason
        this.displayedLabel = json.displayedLabel ? json.displayedLabel : null
    }
}
