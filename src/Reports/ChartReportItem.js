const helperFunctions = require('../utilities/helperFunctions.js')

class ChartReportItem {
  /**
   * @param {object} chartReport
   */
  constructor (chartReport) {
    this.label = chartReport.label
    this.labels = helperFunctions.labelCreator(chartReport)
    this.categoryLabel = chartReport.categoryLabel
    this.categoryKey = chartReport.categoryKey
    this.entrance = chartReport.entrance
    this.objectType = chartReport.objectType
    this.section = chartReport.section
    this.capacity = chartReport.capacity
  }
}

module.exports = ChartReportItem
