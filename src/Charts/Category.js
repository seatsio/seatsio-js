class Category {
  /**
     * @param {string} key
     * @param {string} label
     * @param {string} color
     */
  constructor (key, label, color) {
    this.key = key
    this.label = label
    this.color = color
  }

  /**
     * @param {string} key
     * @returns {Category}
     */
  setKey (key) {
    this.key = key
    return this
  }

  /**
     * @param {string} label
     * @returns {Category}
     */
  setLabel (label) {
    this.label = label
    return this
  }

  /**
     * @param {string} color
     * @returns {Category}
     */
  setColor (color) {
    this.color = color
    return this
  }
}

module.exports = Category
