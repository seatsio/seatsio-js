import { Utilities } from '../utilities/reportUtility'

export class EventReports {
    client: any
    constructor (client: any) {
        this.client = client
    }

    /**
     * @param {string} eventKey
     * @param {?string} status
     * @returns {Object.<string, ObjectInfo[]>}
     */
    byStatus (eventKey: any, status = null) {
        return this.client.get(EventReports.reportUrl('byStatus', eventKey, status))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    summaryByStatus (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byStatus', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    deepSummaryByStatus (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byStatus', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} objectType
     * @returns {Object.<string, ObjectInfo[]>}
     */
    byObjectType (eventKey: any, objectType = null) {
        return this.client.get(EventReports.reportUrl('byObjectType', eventKey, objectType))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    summaryByObjectType (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byObjectType', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    deepSummaryByObjectType (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byObjectType', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} categoryLabel
     * @returns {Object.<string, ObjectInfo[]>}
     */
    byCategoryLabel (eventKey: any, categoryLabel = null) {
        return this.client.get(EventReports.reportUrl('byCategoryLabel', eventKey, categoryLabel))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    summaryByCategoryLabel (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryLabel', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    deepSummaryByCategoryLabel (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byCategoryLabel', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} categoryKey
     * @returns {Object.<string, ObjectInfo[]>}
     */
    byCategoryKey (eventKey: any, categoryKey = null) {
        return this.client.get(EventReports.reportUrl('byCategoryKey', eventKey, categoryKey))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    summaryByCategoryKey (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryKey', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    deepSummaryByCategoryKey (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byCategoryKey', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} label
     * @returns {Object.<string, ObjectInfo[]>}
     */
    byLabel (eventKey: any, label = null) {
        return this.client.get(EventReports.reportUrl('byLabel', eventKey, label))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @param {?string} orderId
     * @returns {Object.<string, ObjectInfo[]>}
     */
    byOrderId (eventKey: any, orderId = null) {
        return this.client.get(EventReports.reportUrl('byOrderId', eventKey, orderId))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @param {?string} section
     * @returns {Object.<string, ObjectInfo[]>}
     */
    bySection (eventKey: any, section = null) {
        return this.client.get(EventReports.reportUrl('bySection', eventKey, section))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    summaryBySection (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('bySection', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    deepSummaryBySection (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('bySection', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} availability
     * @returns {Object.<string, ObjectInfo[]>}
     */
    byAvailability (eventKey: any, availability = null) {
        return this.client.get(EventReports.reportUrl('byAvailability', eventKey, availability))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @param {?string} availabilityReason
     * @returns {Object.<string, ObjectInfo[]>}
     */
    byAvailabilityReason (eventKey: any, availabilityReason = null) {
        return this.client.get(EventReports.reportUrl('byAvailabilityReason', eventKey, availabilityReason))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    summaryByAvailability (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byAvailability', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    summaryByAvailabilityReason (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byAvailabilityReason', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    deepSummaryByAvailability (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byAvailability', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    deepSummaryByAvailabilityReason (eventKey: any) {
        return this.client.get(EventReports.deepSummaryReportUrl('byAvailabilityReason', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} channel
     * @returns {Object.<string, ObjectInfo[]>}
     */
    byChannel (eventKey: any, channel = null) {
        return this.client.get(EventReports.reportUrl('byChannel', eventKey, channel))
            .then((res: any) => Utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
    summaryByChannel (eventKey: any) {
        return this.client.get(EventReports.summaryReportUrl('byChannel', eventKey))
            .then((res: any) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {object} JSON response from the server
     */
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
