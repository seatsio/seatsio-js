class SubaccountListParams {
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
     * @returns {SubaccountListParams}
     */
    withFilter(filter) {
        this.filter = filter;
        return this;
    }

    /**
     * @param {string} tag
     * @returns {SubaccountListParams}
     */
    withTag(tag) {
        this.tag = tag;
        return this;
    }

    /**
     * @param {boolean} expandEvents
     * @returns {SubaccountListParams}
     */
    withExpandEvents(expandEvents) {
        if (expandEvents === true) {
            this.expand = 'events';
        }
        return this;
    }
}

module.exports = SubaccountListParams;
