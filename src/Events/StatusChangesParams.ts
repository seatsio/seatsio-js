export class StatusChangesParams {
    filter?: string
    filterType?: string
    sortDirection?: string
    sortField?: string

    constructor (filter?: string, filterType: string = 'CONTAINS') {
        this.filter = filter
        this.filterType = filterType
    }

    sortByObjectLabel () {
        this.sortField = 'objectLabel'
        return this
    }

    sortByStatus () {
        this.sortField = 'status'
        return this
    }

    sortByDate () {
        this.sortField = 'date'
        return this
    }

    sortAscending () {
        this.sortDirection = 'asc'
        return this
    }

    sortDescending () {
        this.sortDirection = 'desc'
        return this
    }

    withFilter (filter: string, filterType = 'CONTAINS') {
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
            sort
        }
    }
}
