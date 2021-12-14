class ChartListParams {
    /**
     * @param {?string} filter
     * @param {?string} tag
     * @param {?boolean} expandEvents
     * @param {?boolean} withValidation
     * @param {?number} eventsLimit
     */
    constructor (filter = null, tag = null, expandEvents = null, withValidation = false, eventsLimit = null) {
        this.filter = filter
        this.tag = tag
        this.validation = withValidation
        this.eventsLimit = eventsLimit
        if (expandEvents === true) {
            this.expand = 'events'
        }
    }

    /**
     * @param {string} filter
     * @returns {ChartListParams}
     */
    withFilter (filter) {
        this.filter = filter
        return this
    }

    /**
     * @param {string} tag
     * @returns {ChartListParams}
     */
    withTag (tag) {
        this.tag = tag
        return this
    }

    /**
     * @param {boolean} expandEvents
     * @returns {ChartListParams}
     */
    withExpandEvents (expandEvents) {
        if (expandEvents === true) {
            this.expand = 'events'
        }
        return this
    }

    /**
     * @param {number} eventsLimit
     * @returns {ChartListParams}
     */
    withEventsLimit (eventsLimit) {
        this.eventsLimit = eventsLimit
        return this
    }

    /**
     *
     * @param {boolean} validation
     * @returns {ChartListParams}
     */
    withValidation (validation) {
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

module.exports = ChartListParams
