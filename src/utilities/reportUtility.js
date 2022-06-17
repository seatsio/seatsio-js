const ChartObjectInfo = require('../Charts/ChartObjectInfo.js')
const EventObjectInfo = require('../Events/EventObjectInfo.js')

module.exports = {

    createChangeObjectStatusDetails (data) {
        const objectDetails = {}
        for (const key in data) {
            objectDetails[key] = new EventObjectInfo(data[key])
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
            reportObjects[key] = reportsData[key].map(data => new EventObjectInfo(data))
        }
        return reportObjects
    },

    /**
     * @param {object} reportsData
     * @returns {Object.<string, ChartObjectInfo>}
     */
    createChartReport (reportsData) {
        const reportObjects = {}
        for (const key of Object.keys(reportsData)) {
            reportObjects[key] = reportsData[key].map(data => new ChartObjectInfo(data))
        }
        return reportObjects
    }

}
