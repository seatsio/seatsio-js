import { ChartObjectInfo } from '../Charts/ChartObjectInfo'
import { EventObjectInfo } from '../Events/EventObjectInfo'

export class Utilities {
    static createChangeObjectStatusDetails (data) {
        const objectDetails = {}
        for (const key in data) {
            objectDetails[key] = new EventObjectInfo(data[key])
        }
        return objectDetails
    }

    /**
     * @param {object} reportsData
     * @returns {Object.<string, ObjectInfo>}
     */
    static createEventReport (reportsData) {
        const reportObjects = {}
        for (const key of Object.keys(reportsData)) {
            reportObjects[key] = reportsData[key].map(data => new EventObjectInfo(data))
        }
        return reportObjects
    }

    /**
     * @param {object} reportsData
     * @returns {Object.<string, ChartObjectInfo>}
     */
    static createChartReport (reportsData) {
        const reportObjects = {}
        for (const key of Object.keys(reportsData)) {
            reportObjects[key] = reportsData[key].map(data => new ChartObjectInfo(data))
        }
        return reportObjects
    }
}
