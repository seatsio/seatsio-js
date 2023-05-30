export class ChartListParams {
    eventsLimit?: number
    expand?: string
    filter?: string
    tag?: string
    validation?: boolean

    withFilter (filter: string) {
        this.filter = filter
        return this
    }

    withTag (tag: string) {
        this.tag = tag
        return this
    }

    withExpandEvents (expandEvents: boolean) {
        if (expandEvents) {
            this.expand = 'events'
        }
        return this
    }

    withEventsLimit (eventsLimit: number) {
        this.eventsLimit = eventsLimit
        return this
    }

    withValidation (validation: boolean) {
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
