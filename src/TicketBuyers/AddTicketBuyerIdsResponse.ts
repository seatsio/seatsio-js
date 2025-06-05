export class AddTicketBuyerIdsResponse {
    public readonly added: string[]
    public readonly alreadyPresent: string[]

    constructor (data: any) {
        this.added = data.added || []
        this.alreadyPresent = data.alreadyPresent || []
    }
}
