class StatusChangesParams {
  /**
   * @param {?string} filter
   */
  constructor (filter = null) {
    this.filter = filter
    this.sort = null
  }

  /**
   * @returns {StatusChangesParams}
   */
  sortByObjectLabel () {
    this.sort = this.sort ? this.sort.replace(/[a-zA-Z]*:/, 'objectLabel:') : 'objectLabel:asc'
    return this
  }

  /**
   * @returns {StatusChangesParams}
   */
  sortByStatus () {
    this.sort = this.sort ? this.sort.replace(/[a-zA-Z]*:/, 'status:') : 'status:asc'
    return this
  }

  /**
   * @returns {StatusChangesParams}
   */
  sortByDate () {
    this.sort = this.sort ? this.sort.replace(/[a-zA-Z]*:/, 'date:') : 'date:asc'
    return this
  }

  /**
   * @returns {StatusChangesParams}
   */
  sortAscending () {
    this.sort = this.sort ? this.sort.replace(':desc', ':asc') : 'date:asc'
    return this
  }

  /**
   * @returns {StatusChangesParams}
   */
  sortDescending () {
    this.sort = this.sort ? this.sort.replace(':asc', ':desc') : 'date:desc'
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
}

module.exports = StatusChangesParams
