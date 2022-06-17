const helperFunctions = require('../utilities/helperFunctions.js')
const { IDs } = require('../Common/IDs')

class ChartObjectInfo {
    /**
     * @param {object} chartReport
     */
    constructor (chartReport) {
        this.label = chartReport.label
        this.labels = helperFunctions.labelCreator(chartReport)
        this.ids = new IDs(chartReport.ids.own, chartReport.ids.parent, chartReport.ids.section)
        this.categoryLabel = chartReport.categoryLabel
        this.categoryKey = chartReport.categoryKey
        this.entrance = chartReport.entrance
        this.objectType = chartReport.objectType
        this.section = chartReport.section
        this.capacity = chartReport.capacity
        this.bookAsAWhole = chartReport.bookAsAWhole
        this.leftNeighbour = chartReport.leftNeighbour
        this.rightNeighbour = chartReport.rightNeighbour
        this.distanceToFocalPoint = chartReport.distanceToFocalPoint
        this.numSeats = chartReport.numSeats
    }
}

module.exports = ChartObjectInfo
