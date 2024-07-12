import { Utilities } from '../utilities/reportUtility'
import { Axios } from 'axios'
import { CategoryKey } from '../Charts/Category'

export class EventReports {
    client: Axios
    constructor (client: Axios) {
        this.client = client
    }

    byStatus (eventKey: string, status: string | null = null) {
        return this.client.get(EventReports.reportUrl('byStatus', eventKey, status))
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByStatus (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byStatus', eventKey))
            .then(res => res.data)
    }

    deepSummaryByStatus (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byStatus', eventKey))
            .then(res => res.data)
    }

    byObjectType (eventKey: string, objectType: string | null = null) {
        return this.client.get(EventReports.reportUrl('byObjectType', eventKey, objectType))
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByObjectType (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byObjectType', eventKey))
            .then(res => res.data)
    }

    deepSummaryByObjectType (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byObjectType', eventKey))
            .then(res => res.data)
    }

    byCategoryLabel (eventKey: string, categoryLabel: string | null = null) {
        return this.client.get(EventReports.reportUrl('byCategoryLabel', eventKey, categoryLabel))
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByCategoryLabel (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryLabel', eventKey))
            .then(res => res.data)
    }

    deepSummaryByCategoryLabel (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byCategoryLabel', eventKey))
            .then(res => res.data)
    }

    byCategoryKey (eventKey: string, categoryKey: CategoryKey | null = null) {
        return this.client.get(EventReports.reportUrl('byCategoryKey', eventKey, categoryKey))
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByCategoryKey (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryKey', eventKey))
            .then(res => res.data)
    }

    deepSummaryByCategoryKey (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byCategoryKey', eventKey))
            .then(res => res.data)
    }

    byLabel (eventKey: string, label: string | null = null) {
        return this.client.get(EventReports.reportUrl('byLabel', eventKey, label))
            .then(res => Utilities.createEventReport(res.data))
    }

    byOrderId (eventKey: string, orderId: string | null = null) {
        return this.client.get(EventReports.reportUrl('byOrderId', eventKey, orderId))
            .then(res => Utilities.createEventReport(res.data))
    }

    bySection (eventKey: string, section: string | null = null) {
        return this.client.get(EventReports.reportUrl('bySection', eventKey, section))
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryBySection (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('bySection', eventKey))
            .then(res => res.data)
    }

    deepSummaryBySection (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('bySection', eventKey))
            .then(res => res.data)
    }

    byZone (eventKey: string, zone: string | null = null) {
        return this.client.get(EventReports.reportUrl('byZone', eventKey, zone))
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByZone (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byZone', eventKey))
            .then(res => res.data)
    }

    deepSummaryByZone (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byZone', eventKey))
            .then(res => res.data)
    }

    byAvailability (eventKey: string, availability: string | null = null) {
        return this.client.get(EventReports.reportUrl('byAvailability', eventKey, availability))
            .then(res => Utilities.createEventReport(res.data))
    }

    byAvailabilityReason (eventKey: string, availabilityReason: string | null = null) {
        return this.client.get(EventReports.reportUrl('byAvailabilityReason', eventKey, availabilityReason))
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByAvailability (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byAvailability', eventKey))
            .then(res => res.data)
    }

    summaryByAvailabilityReason (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byAvailabilityReason', eventKey))
            .then(res => res.data)
    }

    deepSummaryByAvailability (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byAvailability', eventKey))
            .then(res => res.data)
    }

    deepSummaryByAvailabilityReason (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byAvailabilityReason', eventKey))
            .then(res => res.data)
    }

    byChannel (eventKey: string, channel: string | null = null) {
        return this.client.get(EventReports.reportUrl('byChannel', eventKey, channel))
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByChannel (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byChannel', eventKey))
            .then(res => res.data)
    }

    deepSummaryByChannel (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byChannel', eventKey))
            .then(res => res.data)
    }

    static reportUrl (reportType: string, eventKey: string, filter: string | number | null) {
        if (filter === null || typeof filter === 'undefined') {
            return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}`
        }
        return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}/${encodeURIComponent(filter)}`
    }

    static summaryReportUrl (reportType: string, eventKey: string) {
        return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}/summary`
    }

    static deepSummaryReportUrl (reportType: string, eventKey: string) {
        return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}/summary/deep`
    }
}
