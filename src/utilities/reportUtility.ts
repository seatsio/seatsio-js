import { ChartObjectInfo } from '../Charts/ChartObjectInfo'
import { EventObjectInfo } from '../Events/EventObjectInfo'

export class Utilities {
    static createChangeObjectStatusDetails (data: any) {
        const objectDetails = {}
        for (const key in data) {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            objectDetails[key] = new EventObjectInfo(data[key])
        }
        return objectDetails
    }

    static createEventReport (reportsData: any) {
        const reportObjects = {}
        for (const key of Object.keys(reportsData)) {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            reportObjects[key] = reportsData[key].map((data: any) => new EventObjectInfo(data))
        }
        return reportObjects
    }

    static createChartReport (reportsData: any) {
        const reportObjects = {}
        for (const key of Object.keys(reportsData)) {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            reportObjects[key] = reportsData[key].map((data: any) => new ChartObjectInfo(data))
        }
        return reportObjects
    }
}
