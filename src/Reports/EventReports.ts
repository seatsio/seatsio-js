import { Utilities } from '../utilities/reportUtility.js'
import { Axios } from 'axios'
import { CategoryKey } from '../Charts/Category.js'
import { EventObjectInfo } from '../Events/EventObjectInfo.js'

export class EventReports {
    client: Axios
    private readonly seasonBookingsPropagated: boolean

    constructor (client: Axios, seasonBookingsPropagated: boolean = true) {
        this.client = client
        this.seasonBookingsPropagated = seasonBookingsPropagated
    }

    withSeasonBookingsNotPropagated (): EventReports {
        return new EventReports(this.client, false)
    }

    flatList (eventKey: string): Promise<EventObjectInfo[]> {
        return this.client.get(`/reports/events/${encodeURIComponent(eventKey)}`, { params: this.queryParams() })
            .then(res => (res.data as any[]).map(d => new EventObjectInfo(d)))
    }

    flatListCsv (eventKey: string): Promise<string> {
        return this.client.get(`/reports/events/${encodeURIComponent(eventKey)}.csv`, { params: this.queryParams() })
            .then(res => res.data as string)
    }

    byStatus (eventKey: string, status: string | null = null) {
        return this.client.get(EventReports.reportUrl('byStatus', eventKey, status), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByStatus (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byStatus', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    deepSummaryByStatus (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byStatus', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    byObjectType (eventKey: string, objectType: string | null = null) {
        return this.client.get(EventReports.reportUrl('byObjectType', eventKey, objectType), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByObjectType (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byObjectType', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    deepSummaryByObjectType (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byObjectType', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    byCategoryLabel (eventKey: string, categoryLabel: string | null = null) {
        return this.client.get(EventReports.reportUrl('byCategoryLabel', eventKey, categoryLabel), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByCategoryLabel (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryLabel', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    deepSummaryByCategoryLabel (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byCategoryLabel', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    byCategoryKey (eventKey: string, categoryKey: CategoryKey | null = null) {
        return this.client.get(EventReports.reportUrl('byCategoryKey', eventKey, categoryKey), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByCategoryKey (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryKey', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    deepSummaryByCategoryKey (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byCategoryKey', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    byLabel (eventKey: string, label: string | null = null) {
        return this.client.get(EventReports.reportUrl('byLabel', eventKey, label), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    byOrderId (eventKey: string, orderId: string | null = null) {
        return this.client.get(EventReports.reportUrl('byOrderId', eventKey, orderId), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    bySection (eventKey: string, section: string | null = null) {
        return this.client.get(EventReports.reportUrl('bySection', eventKey, section), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryBySection (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('bySection', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    deepSummaryBySection (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('bySection', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    byZone (eventKey: string, zone: string | null = null) {
        return this.client.get(EventReports.reportUrl('byZone', eventKey, zone), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByZone (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byZone', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    deepSummaryByZone (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byZone', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    byAvailability (eventKey: string, availability: string | null = null) {
        return this.client.get(EventReports.reportUrl('byAvailability', eventKey, availability), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    byAvailabilityReason (eventKey: string, availabilityReason: string | null = null) {
        return this.client.get(EventReports.reportUrl('byAvailabilityReason', eventKey, availabilityReason), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByAvailability (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byAvailability', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    summaryByAvailabilityReason (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byAvailabilityReason', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    deepSummaryByAvailability (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byAvailability', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    deepSummaryByAvailabilityReason (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byAvailabilityReason', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    byChannel (eventKey: string, channel: string | null = null) {
        return this.client.get(EventReports.reportUrl('byChannel', eventKey, channel), { params: this.queryParams() })
            .then(res => Utilities.createEventReport(res.data))
    }

    summaryByChannel (eventKey: string) {
        return this.client.get(EventReports.summaryReportUrl('byChannel', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    deepSummaryByChannel (eventKey: string) {
        return this.client.get(EventReports.deepSummaryReportUrl('byChannel', eventKey), { params: this.queryParams() })
            .then(res => res.data)
    }

    private queryParams (): Record<string, boolean> {
        if (this.seasonBookingsPropagated) {
            return {}
        }
        return { seasonBookingsPropagated: false }
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
