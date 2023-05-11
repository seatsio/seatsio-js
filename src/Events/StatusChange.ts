export class StatusChange {
    date: any;
    displayedLabel: any;
    eventId: any;
    extraData: any;
    holdToken: any;
    id: any;
    isPresentOnChart: any;
    notPresentOnChartReason: any;
    objectLabel: any;
    orderId: any;
    origin: any;
    quantity: any;
    status: any;

    constructor (statusChange: any) {
        this.id = statusChange.id
        this.eventId = statusChange.eventId
        this.status = statusChange.status
        this.quantity = statusChange.quantity
        this.objectLabel = statusChange.objectLabel
        this.date = new Date(statusChange.date)
        this.orderId = statusChange.orderId ? statusChange.orderId : null
        this.extraData = statusChange.extraData ? statusChange.extraData : null
        this.holdToken = statusChange.holdToken ? statusChange.holdToken : null
        this.origin = statusChange.origin
        this.isPresentOnChart = statusChange.isPresentOnChart
        this.notPresentOnChartReason = statusChange.notPresentOnChartReason
        this.displayedLabel = statusChange.displayedLabel ? statusChange.displayedLabel : null
    }
}
