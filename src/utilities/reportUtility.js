const EventReportItem = require('../Reports/EventReportItem.js')
const ChartReportItem = require('../Reports/ChartReportItem.js')

module.exports = {

    createChangeObjectStatusDetails (data) {
        const objectDetails = {}
        for (const key in data) {
            objectDetails[key] = new EventReportItem(data[key])
        }
        return objectDetails
    },

    /**
     * @param {object} reportsData
     * @returns {Object.<string, EventReportItem>}
     */
    createEventReport (reportsData) {
        const reportObjects = {}
        for (const key of Object.keys(reportsData)) {
            reportObjects[key] = reportsData[key].map(data => new EventReportItem(data))
        }
        return reportObjects
    },

    /**
     * @param {object} reportsData
     * @returns {Object.<string, ChartReportItem>}
     */
    createChartReport (reportsData) {
        const reportObjects = {}
        for (const key of Object.keys(reportsData)) {
            reportObjects[key] = reportsData[key].map(data => new ChartReportItem(data))
        }
        return reportObjects
    }

}
