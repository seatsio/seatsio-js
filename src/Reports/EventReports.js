const utilities = require('../utilities.js');

class EventReports {
    constructor(client) {
        this.client = client;
    }

    /**
     * @param {string} reportType
     * @param {string} eventKey
     * * @param {string} filter
     * @returns {string}
     */
    static reportUrl(reportType, eventKey, filter) {
        if (filter === null || typeof filter === 'undefined') {
            return `/reports/events/${eventKey}/${reportType}`;
        }
        return `/reports/events/${eventKey}/${reportType}/${filter}`;
    }

    /**
     * @param {string} reportType
     * @param {string} eventKey
     * @returns {string}
     */
    static summaryReportUrl(reportType, eventKey) {
        return `/reports/events/${eventKey}/${reportType}/summary`;
    }

    /**
     * @param {string} eventKey
     * @param {?string} status
     * @returns {(Object.<string, EventReportItem[]> | null)}
     */
    byStatus(eventKey, status = null) {
        return this.client.get(EventReports.reportUrl('byStatus', eventKey, status))
            .then((res) => utilities.createEventReport(res.data, status));
    }

    /**
     * @param {string} eventKey
     * @returns {Object}
     */
    summaryByStatus(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byStatus', eventKey))
            .then((res) => res.data);
    }

    /**
     * @param {string} eventKey
     * @param {?string} categoryLabel
     * @returns {Object.<string, EventReportItem[]>}
     */
    byCategoryLabel(eventKey, categoryLabel = null) {
        return this.client.get(EventReports.reportUrl('byCategoryLabel', eventKey, categoryLabel))
            .then((res) => utilities.createEventReport(res.data));
    }

    /**
     * @param {string} eventKey
     * @returns {Object}
     */
    summaryByCategoryLabel(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryLabel', eventKey))
            .then((res) => res.data);
    }

    /**
     * @param {string} eventKey
     * @param {?string} categoryKey
     * @returns {Object.<string, EventReportItem[]>}
     */
    byCategoryKey(eventKey, categoryKey = null) {
        return this.client.get(EventReports.reportUrl('byCategoryKey', eventKey, categoryKey))
            .then((res) => utilities.createEventReport(res.data));
    }

    /**
     * @param {string} eventKey
     * @returns {Object}
     */
    summaryByCategoryKey(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryKey', eventKey))
            .then((res) => res.data);
    }

    /**
     * @param {string} eventKey
     * @param {?string} label
     * @returns {Object.<string, EventReportItem[]>}
     */
    byLabel(eventKey, label = null) {
        return this.client.get(EventReports.reportUrl('byLabel', eventKey, label))
            .then((res) => utilities.createEventReport(res.data));
    }

    /**
     * @param {string} eventKey
     * @param {?string} orderId
     * @returns {Object.<string, EventReportItem[]>}
     */
    byOrderId(eventKey, orderId = null) {
        return this.client.get(EventReports.reportUrl('byOrderId', eventKey, orderId))
            .then((res) => utilities.createEventReport(res.data));
    }

    /**
     * @param {string} eventKey
     * @param {?string} section
     * @returns {Object.<string, EventReportItem[]>}
     */
    bySection(eventKey, section = null) {
        return this.client.get(EventReports.reportUrl('bySection', eventKey, section))
            .then((res) => utilities.createEventReport(res.data));
    }

    /**
     * @param {string} eventKey
     * @returns {Object}
     */
    summaryBySection(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('bySection', eventKey))
            .then((res) => res.data);
    }
}

module.exports = EventReports;
