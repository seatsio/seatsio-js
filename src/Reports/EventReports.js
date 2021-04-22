const utilities = require('../utilities/reportUtility.js')

class EventReports {
    constructor (client) {
        this.client = client
    }

    /**
     * @param {string} eventKey
     * @param {?string} status
     * @returns {Object.<string, EventReportItem[]>}
     */
    byStatus (eventKey, status = null) {
        return this.client.get(EventReports.reportUrl('byStatus', eventKey, status))
            .then((res) => utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    summaryByStatus (eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byStatus', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    deepSummaryByStatus (eventKey) {
        return this.client.get(EventReports.deepSummaryReportUrl('byStatus', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} objectType
     * @returns {Object.<string, EventReportItem[]>}
     */
    byObjectType (eventKey, objectType = null) {
        return this.client.get(EventReports.reportUrl('byObjectType', eventKey, objectType))
            .then((res) => utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    summaryByObjectType (eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byObjectType', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    deepSummaryByObjectType (eventKey) {
        return this.client.get(EventReports.deepSummaryReportUrl('byObjectType', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} categoryLabel
     * @returns {Object.<string, EventReportItem[]>}
     */
    byCategoryLabel (eventKey, categoryLabel = null) {
        return this.client.get(EventReports.reportUrl('byCategoryLabel', eventKey, categoryLabel))
            .then((res) => utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    summaryByCategoryLabel (eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryLabel', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    deepSummaryByCategoryLabel (eventKey) {
        return this.client.get(EventReports.deepSummaryReportUrl('byCategoryLabel', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} categoryKey
     * @returns {Object.<string, EventReportItem[]>}
     */
    byCategoryKey (eventKey, categoryKey = null) {
        return this.client.get(EventReports.reportUrl('byCategoryKey', eventKey, categoryKey))
            .then((res) => utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    summaryByCategoryKey (eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryKey', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    deepSummaryByCategoryKey (eventKey) {
        return this.client.get(EventReports.deepSummaryReportUrl('byCategoryKey', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} label
     * @returns {Object.<string, EventReportItem[]>}
     */
    byLabel (eventKey, label = null) {
        return this.client.get(EventReports.reportUrl('byLabel', eventKey, label))
            .then((res) => utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @param {?string} orderId
     * @returns {Object.<string, EventReportItem[]>}
     */
    byOrderId (eventKey, orderId = null) {
        return this.client.get(EventReports.reportUrl('byOrderId', eventKey, orderId))
            .then((res) => utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @param {?string} section
     * @returns {Object.<string, EventReportItem[]>}
     */
    bySection (eventKey, section = null) {
        return this.client.get(EventReports.reportUrl('bySection', eventKey, section))
            .then((res) => utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    summaryBySection (eventKey) {
        return this.client.get(EventReports.summaryReportUrl('bySection', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    deepSummaryBySection (eventKey) {
        return this.client.get(EventReports.deepSummaryReportUrl('bySection', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} selectability
     * @returns {Object.<string, EventReportItem[]>}
     */
    bySelectability (eventKey, selectability = null) {
        return this.client.get(EventReports.reportUrl('bySelectability', eventKey, selectability))
            .then((res) => utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    summaryBySelectability (eventKey) {
        return this.client.get(EventReports.summaryReportUrl('bySelectability', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    deepSummaryBySelectability (eventKey) {
        return this.client.get(EventReports.deepSummaryReportUrl('bySelectability', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @param {?string} channel
     * @returns {Object.<string, EventReportItem[]>}
     */
    byChannel (eventKey, channel = null) {
        return this.client.get(EventReports.reportUrl('byChannel', eventKey, channel))
            .then((res) => utilities.createEventReport(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    summaryByChannel (eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byChannel', eventKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} eventKey
     * @returns {Object} JSON response from the server
     */
    deepSummaryByChannel (eventKey) {
        return this.client.get(EventReports.deepSummaryReportUrl('byChannel', eventKey))
            .then((res) => res.data)
    }

    static reportUrl (reportType, eventKey, filter) {
        if (filter === null || typeof filter === 'undefined') {
            return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}`
        }
        return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}/${encodeURIComponent(filter)}`
    }

    static summaryReportUrl (reportType, eventKey) {
        return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}/summary`
    }

    static deepSummaryReportUrl (reportType, eventKey) {
        return `/reports/events/${encodeURIComponent(eventKey)}/${reportType}/summary/deep`
    }
}

module.exports = EventReports
