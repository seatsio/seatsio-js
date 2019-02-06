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
        this.filter = '';
        this.sort = 'objectLabel';
        return this;
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortByStatus (){
        this.filter = '';
        this.sort = 'status';
        return this;
    }

    /**
     * @returns {StatusChangesParams}
     */
    sortByDateAsc (){
        this.filter = '';
        this.sort = 'date:asc';
        return this;
    }

    /**
     * @param {string} filter
     * @returns {StatusChangesParams}
     */
    withFilter(filter) {
        this.sort = '';
        this.filter = filter;
        return this;
    }
}

module.exports = StatusChangesParams;
