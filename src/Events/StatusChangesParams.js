class StatusChangesParams {
    /**
     * @param {?string} filter
     */
    constructor(filter = null) {
        this.filter = filter;
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortByObjectLabel (){
        this.sort = 'objectLabel';
        return this;
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortByStatus (){
        this.sort = 'status';
        return this;
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortByDate (){
        this.sort = 'date';
        return this;
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortAscending(){
        this.sortDirection = 'asc';
        return this;
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortDescending(){
        this.sortDirection = 'desc';
        return this;
    }

    /**
     * @param {string} filter
     * @returns {StatusChangesParams}
     */
    withFilter (filter) {
        this.filter = filter;
        return this;
    }
}

module.exports = StatusChangesParams;
