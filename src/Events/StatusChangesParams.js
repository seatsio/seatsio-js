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
    sortByDateAsc (){
        this.sort = 'date:asc';
        return this;
    }

    /**
     * @param {string} filter
     * @returns {StatusChangesParams}
     */
    withFilter(filter) {
        this.filter = filter;
        return this;
    }
}

module.exports = StatusChangesParams;
