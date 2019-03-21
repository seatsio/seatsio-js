class SubaccountListParams {
  /**
   * @param {?string} filter
   */
  constructor (filter = null) {
    this.filter = filter
  }

  /**
   * @param {string} filter
   * @returns {SubaccountListParams}
   */
  withFilter (filter) {
    this.filter = filter
    return this
  }

  serialize () {
    return { filter: this.filter }
  }
}

module.exports = SubaccountListParams
