class ChartListParams {
    /**
     * @param {?string} filter
     * @param {?string} tag
     * @param {?boolean} expandEvents
     */
    constructor(filter = null, tag = null, expandEvents = null) {
        this.filter = filter;
        this.tag = tag;
        if (expandEvents === true) {
            this.expand = 'events';
        }
    }

    /**
     * @param {string} filter
     * @returns {ChartListParams}
     */
    withFilter(filter) {
        this.filter = filter;
        return this;
    }

    /**
     * @param {string} tag
     * @returns {ChartListParams}
     */
    withTag(tag) {
        this.tag = tag;
        return this;
    }

    /**
     * @param {boolean} expandEvents
     * @returns {ChartListParams}
     */
    withExpandEvents(expandEvents) {
        if (expandEvents === true) {
            this.expand = 'events';
        }
        return this;
    }
}

module.exports = ChartListParams;
