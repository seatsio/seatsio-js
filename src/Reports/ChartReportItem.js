class ChartReportItem {
  /**
     *
     * @param {string} label
     * @param {Common/Label} labels
     * @param {string} categoryLabel
     * @param {string} categoryKey
     * @param {string} entrance
     * @param {string} objectType
     * @param {string} section
     * @param {number} capacity
     */
  constructor (label, labels, categoryLabel, categoryKey, entrance, objectType, section, capacity) {
    this.label = label
    this.labels = labels
    this.categoryLabel = categoryLabel
    this.categoryKey = categoryKey
    this.entrance = entrance
    this.objectType = objectType
    this.section = section
    this.capacity = capacity
  }
}

module.exports = ChartReportItem
