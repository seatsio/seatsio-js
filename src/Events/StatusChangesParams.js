class StatusChangesParams {
    /**
     * @param {?string} filter
     * @param {?string} filterType
     */
    constructor (filter = null, filterType = 'CONTAINS') {
        this.filter = filter
        this.filterType = filterType
        this.sortField = null
        this.sortDirection = null
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortByObjectLabel () {
        this.sortField = 'objectLabel'
        return this
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortByStatus () {
        this.sortField = 'status'
        return this
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortByDate () {
        this.sortField = 'date'
        return this
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortAscending () {
        this.sortDirection = 'asc'
        return this
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortDescending () {
        this.sortDirection = 'desc'
        return this
    }

    /**
     * @param {string} filter
     * @param {?string} filterType: CONTAINS, MATCHES, BEGINS_WITH or ENDS_WITH
     * @returns {StatusChangesParams}
     */
    withFilter (filter, filterType = 'CONTAINS') {
        this.filter = filter
        this.filterType = filterType
        return this
    }

    serialize () {
        let sort = null
        if (this.sortField && this.sortDirection) {
            sort = this.sortField + ':' + this.sortDirection
        } else if (!this.sortField && this.sortDirection) {
            sort = 'date:' + this.sortDirection
        } else if (this.sortField && !this.sortDirection) {
            sort = this.sortField + ':asc'
        }

        return {
            filter: this.filter,
            filterType: this.filterType,
            sort: sort
        }
    }
}

module.exports = StatusChangesParams
