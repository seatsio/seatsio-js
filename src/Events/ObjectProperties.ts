export class ObjectProperties {
    extraData?: object
    objectId: string
    quantity?: number
    ticketType?: string

    constructor (objectId: string) {
        this.objectId = objectId
    }

    setTicketType (ticketType: string) {
        this.ticketType = ticketType
        return this
    }

    setQuantity (quantity: number) {
        this.quantity = quantity
        return this
    }

    setExtraData (extraData: object) {
        this.extraData = extraData
        return this
    }
}
