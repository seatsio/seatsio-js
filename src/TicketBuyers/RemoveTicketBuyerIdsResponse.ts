export class RemoveTicketBuyerIdsResponse {
    public readonly removed: string[]
    public readonly notPresent: string[]

    constructor (data: any) {
        this.removed = data.removed || []
        this.notPresent = data.notPresent || []
    }
}
