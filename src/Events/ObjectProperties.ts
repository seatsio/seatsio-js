export class ObjectProperties {
    extraData: any
    objectId: any
    quantity: any
    ticketType: any

    constructor (objectId: any) {
        this.objectId = objectId
    }

    setTicketType (ticketType: any) {
        this.ticketType = ticketType
        return this
    }

    setQuantity (quantity: any) {
        this.quantity = quantity
        return this
    }

    setExtraData (extraData: any) {
        this.extraData = extraData
        return this
    }
}
