class StatusChangesParams {
    /**
     * @param {?string} filter
     */
    constructor (filter = null) {
        this.filter = filter
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
     * @returns {StatusChangesParams}
     */
    withFilter (filter) {
        this.filter = filter
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
            sort: sort
        }
    }
}

module.exports = StatusChangesParams
