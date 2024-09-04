import { Dict } from '../Dict'

export class BestAvailableParams {
    number?: number
    categories?: string[]
    zone?: string
    extraData?: Dict<any>
    ticketTypes?: string[]
    tryToPreventOrphanSeats?: boolean
    accessibleSeats?: number

    withNumber (number: number) {
        this.number = number
        return this
    }

    withCategories (categories: string[]) {
        this.categories = categories
        return this
    }

    withZone (zone: string) {
        this.zone = zone
        return this
    }

    withExtraData (extraData: Dict<any>) {
        this.extraData = extraData
        return this
    }

    withTicketTypes (ticketTypes: string[]) {
        this.ticketTypes = ticketTypes
        return this
    }

    withTryToPreventOrphanSeats (tryToPreventOrphanSeats: boolean) {
        this.tryToPreventOrphanSeats = tryToPreventOrphanSeats
        return this
    }

    withAccessibleSeats (accessibleSeats: number) {
        this.accessibleSeats = accessibleSeats
        return this
    }
}
