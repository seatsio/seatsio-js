import { Utilities } from '../utilities/reportUtility'

export class EventReports {
    client: any
    constructor (client: any) {
        this.client = client
    }

    byStatus (eventKey: any, status = null) {
        return this.client.get(EventReports.reportUrl('byStatus', eventKey, status))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    summaryByStatus (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byStatus', eventKey))
            .then((res: any) => res.data)
    }

    deepSummaryByStatus (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byStatus', eventKey))
            .then((res: any) => res.data)
    }

    byObjectType (eventKey: any, objectType = null) {
        return this.client.get(EventReports.reportUrl('byObjectType', eventKey, objectType))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    summaryByObjectType (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byObjectType', eventKey))
            .then((res: any) => res.data)
    }

    deepSummaryByObjectType (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byObjectType', eventKey))
            .then((res: any) => res.data)
    }

    byCategoryLabel (eventKey: any, categoryLabel = null) {
        return this.client.get(EventReports.reportUrl('byCategoryLabel', eventKey, categoryLabel))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    summaryByCategoryLabel (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryLabel', eventKey))
            .then((res: any) => res.data)
    }

    deepSummaryByCategoryLabel (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byCategoryLabel', eventKey))
            .then((res: any) => res.data)
    }

    byCategoryKey (eventKey: any, categoryKey = null) {
        return this.client.get(EventReports.reportUrl('byCategoryKey', eventKey, categoryKey))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    summaryByCategoryKey (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryKey', eventKey))
            .then((res: any) => res.data)
    }

    deepSummaryByCategoryKey (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byCategoryKey', eventKey))
            .then((res: any) => res.data)
    }

    byLabel (eventKey: any, label = null) {
        return this.client.get(EventReports.reportUrl('byLabel', eventKey, label))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    byOrderId (eventKey: any, orderId = null) {
        return this.client.get(EventReports.reportUrl('byOrderId', eventKey, orderId))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    bySection (eventKey: any, section = null) {
        return this.client.get(EventReports.reportUrl('bySection', eventKey, section))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    summaryBySection (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('bySection', eventKey))
            .then((res: any) => res.data)
    }

    deepSummaryBySection (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('bySection', eventKey))
            .then((res: any) => res.data)
    }

    byAvailability (eventKey: any, availability = null) {
        return this.client.get(EventReports.reportUrl('byAvailability', eventKey, availability))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    byAvailabilityReason (eventKey: any, availabilityReason = null) {
        return this.client.get(EventReports.reportUrl('byAvailabilityReason', eventKey, availabilityReason))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    summaryByAvailability (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byAvailability', eventKey))
            .then((res: any) => res.data)
    }

    summaryByAvailabilityReason (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byAvailabilityReason', eventKey))
            .then((res: any) => res.data)
    }

    deepSummaryByAvailability (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byAvailability', eventKey))
            .then((res: any) => res.data)
    }

    deepSummaryByAvailabilityReason (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byAvailabilityReason', eventKey))
            .then((res: any) => res.data)
    }

    byChannel (eventKey: any, channel = null) {
        return this.client.get(EventReports.reportUrl('byChannel', eventKey, channel))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    summaryByChannel (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byChannel', eventKey))
            .then((res: any) => res.data)
    }

    deepSummaryByChannel (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byChannel', eventKey))
            .then((res: any) => res.data)
    }

    static reportUrl (reportType: any, eventKey: any, filter: any) {
        if (filter === null || typeof filter === 'undefined') {
            return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}`
        }
        return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}/${encodeURIComponent(filter)}`
    }

    static summaryReportUrl (reportType: any, eventKey: any) {
        return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}/summary`
    }

    static deepSummaryReportUrl (reportType: any, eventKey: any) {
        return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}/summary/deep`
    }
}
