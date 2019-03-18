class ChartReportItem {
  /**
   * @param {object} chartReport
   * @param {Common/Label} labels
   */
  constructor (chartReport, labels) {
    this.label = chartReport.label
    this.labels = labels
    this.categoryLabel = chartReport.categoryLabel
    this.categoryKey = chartReport.categoryKey
    this.entrance = chartReport.entrance
    this.objectType = chartReport.objectType
    this.section = chartReport.section
    this.capacity = chartReport.capacity
  }
}

module.exports = ChartReportItem
