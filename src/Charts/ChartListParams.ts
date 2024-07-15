export class ChartListParams {
    eventsLimit?: number
    filter?: string
    tag?: string
    expandEvents: boolean = false
    expandValidation: boolean = false
    expandVenueType: boolean = false

    withFilter (filter: string) {
        this.filter = filter
        return this
    }

    withTag (tag: string) {
        this.tag = tag
        return this
    }

    withExpandEvents (expandEvents: boolean) {
        this.expandEvents = expandEvents
        return this
    }

    withEventsLimit (eventsLimit: number) {
        this.eventsLimit = eventsLimit
        return this
    }

    // @deprecated use withExpandValidation instead
    withValidation (validation: boolean) {
        return this.withExpandValidation(validation)
    }

    withExpandValidation (expandValidation: boolean) {
        this.expandValidation = expandValidation
        return this
    }

    withExpandVenueType (expandVenueType: boolean) {
        this.expandVenueType = expandVenueType
        return this
    }

    serialize () {
        return {
            tag: this.tag,
            expand: this.expandParams(),
            filter: this.filter,
            eventsLimit: this.eventsLimit
        }
    }

    private expandParams () {
        const expandParams = []
        if (this.expandEvents) {
            expandParams.push('events')
        }
        if (this.expandValidation) {
            expandParams.push('validation')
        }
        if (this.expandVenueType) {
            expandParams.push('venueType')
        }
        return expandParams
    }
}
