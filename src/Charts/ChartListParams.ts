export class ChartListParams {
    eventsLimit: any
    expand: any
    filter: any
    tag: any
    validation: any

    constructor (filter = null, tag = null, expandEvents = null, withValidation = false, eventsLimit = null) {
        this.filter = filter
        this.tag = tag
        this.validation = withValidation
        this.eventsLimit = eventsLimit
        if (expandEvents === true) {
            this.expand = 'events'
        }
    }

    withFilter (filter: any) {
        this.filter = filter
        return this
    }

    withTag (tag: any) {
        this.tag = tag
        return this
    }

    withExpandEvents (expandEvents: any) {
        if (expandEvents === true) {
            this.expand = 'events'
        }
        return this
    }

    withEventsLimit (eventsLimit: any) {
        this.eventsLimit = eventsLimit
        return this
    }

    withValidation (validation: any) {
        this.validation = validation
        return this
    }

    serialize () {
        return {
            tag: this.tag,
            expand: this.expand,
            filter: this.filter,
            validation: this.validation,
            eventsLimit: this.eventsLimit
        }
    }
}
