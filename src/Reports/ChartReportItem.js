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
        this.bookAsAWhole = report.bookAsAWhole
        this.leftNeighbour = chartReport.leftNeighbour
        this.rightNeighbour = chartReport.rightNeighbour
    }
}

module.exports = ChartReportItem
