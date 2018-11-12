const utilities = require('../utilities.js');

class EventReports {
    constructor(client) {
        this.client = client;
    }

    /* @return string */
    static reportUrl(reportType, eventKey, filter) {
        if (filter === null || typeof filter === 'undefined') {
            return `/reports/events/${eventKey}/${reportType}`;
        }
        return `/reports/events/${eventKey}/${reportType}/${filter}`;
    }

    /* @return string */
    static summaryReportUrl(reportType, eventKey) {
        return `/reports/events/${eventKey}/${reportType}/summary`;
    }

    /* @return EventReportItem */
    byStatus(eventKey, status = null) {
        return this.client.get(EventReports.reportUrl('byStatus', eventKey, status))
            .then((res) => utilities.createEventReport(res.data));
    }

    /* @return JSON|{} */
    summaryByStatus(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byStatus', eventKey))
            .then((res) => res.data);
    }

    /* @return EventReportItem */
    byCategoryLabel(eventKey, categoryLabel = null) {
        return this.client.get(EventReports.reportUrl('byCategoryLabel', eventKey, categoryLabel))
            .then((res) => utilities.createEventReport(res.data));
    }

    /* @return JSON|{} */
    summaryByCategoryLabel(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryLabel', eventKey))
            .then((res) => res.data);
    }

    /* @return EventReportItem */
    byCategoryKey(eventKey, categoryKey = null) {
        return this.client.get(EventReports.reportUrl('byCategoryKey', eventKey, categoryKey))
            .then((res) => utilities.createEventReport(res.data));
    }

    /* @return JSON|{} */
    summaryByCategoryKey(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryKey', eventKey))
            .then((res) => res.data);
    }

    /* @return EventReportItem */
    byLabel(eventKey, label = null) {
        return this.client.get(EventReports.reportUrl('byLabel', eventKey, label))
            .then((res) => utilities.createEventReport(res.data));
    }

    /* @return EventReportItem */
    byOrderId(eventKey, orderId = null) {
        return this.client.get(EventReports.reportUrl('byOrderId', eventKey, orderId))
            .then((res) => utilities.createEventReport(res.data));
    }

    /* @return EventReportItem */
    bySection(eventKey, section = null) {
        return this.client.get(EventReports.reportUrl('bySection', eventKey, section))
            .then((res) => utilities.createEventReport(res.data));
    }

    /* @return JSON|{} */
    summaryBySection(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('bySection', eventKey))
            .then((res) => res.data);
    }
}

module.exports = EventReports;
