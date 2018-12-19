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
}

module.exports = SubaccountListParams;
