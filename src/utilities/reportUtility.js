const ChartReportItem = require('../Reports/ChartReportItem.js')
const ObjectInfo = require('../Events/ObjectInfo')

module.exports = {

    createChangeObjectStatusDetails (data) {
        const objectDetails = {}
        for (const key in data) {
            objectDetails[key] = new ObjectInfo(data[key])
        }
        return objectDetails
    },

    /**
     * @param {object} reportsData
     * @returns {Object.<string, ObjectInfo>}
     */
    createEventReport (reportsData) {
        const reportObjects = {}
        for (const key of Object.keys(reportsData)) {
            reportObjects[key] = reportsData[key].map(data => new ObjectInfo(data))
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
