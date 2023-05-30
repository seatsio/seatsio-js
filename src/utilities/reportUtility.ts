import { ChartObjectInfo, ChartObjectInfoJson } from '../Charts/ChartObjectInfo'
import { EventObjectInfo, EventObjectInfoJson } from '../Events/EventObjectInfo'
import { Dict } from '../Dict'

export class Utilities {
    static createChangeObjectStatusDetails (data: Dict<EventObjectInfoJson>) {
        const objectDetails: Dict<EventObjectInfo> = {}
        for (const key in data) {
            objectDetails[key] = new EventObjectInfo(data[key])
        }
        return objectDetails
    }

    static createEventReport (reportsData: Dict<EventObjectInfoJson[]>) {
        const reportObjects: Dict<EventObjectInfoJson> = {}
        for (const key of Object.keys(reportsData)) {
            reportObjects[key] = reportsData[key].map(data => new EventObjectInfo(data))
        }
        return reportObjects
    }

    static createChartReport (reportsData: Dict<ChartObjectInfoJson[]>) {
        const reportObjects: Dict<ChartObjectInfoJson> = {}
        for (const key of Object.keys(reportsData)) {
            reportObjects[key] = reportsData[key].map((data: any) => new ChartObjectInfo(data))
        }
        return reportObjects
    }
}
