class SubaccountListParams {
    /**
     * @param {?string} filter
     */
    constructor(filter = null) {
        this.filter = filter;
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
