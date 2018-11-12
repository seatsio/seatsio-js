const utilities = require('../utilities.js');

class EventReports {
    constructor(client) {
        this.client = client;
    }

    byLabel(eventKey, label = null) {
        return this.client.get(EventReports.reportUrl('byLabel', eventKey, label))
            .then((res) => utilities.createEventReport(res.data));
    }

    byStatus(eventKey, status = null) {
        return this.client.get(EventReports.reportUrl('byStatus', eventKey, status))
            .then((res) => utilities.createEventReport(res.data));
    }

    byCategoryLabel(eventKey, categoryLabel = null) {
        return this.client.get(EventReports.reportUrl('byCategoryLabel', eventKey, categoryLabel))
            .then((res) => utilities.createEventReport(res.data));
    }

    byCategoryKey(eventKey, categoryKey = null) {
        return this.client.get(EventReports.reportUrl('byCategoryKey', eventKey, categoryKey))
            .then((res) => utilities.createEventReport(res.data));
    }

    byOrderId(eventKey, orderId = null) {
        return this.client.get(EventReports.reportUrl('byOrderId', eventKey, orderId))
            .then((res) => utilities.createEventReport(res.data));
    }

    bySection(eventKey, section = null) {
        return this.client.get(EventReports.reportUrl('bySection', eventKey, section))
            .then((res) => utilities.createEventReport(res.data));
    }

    summaryBySection(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('bySection', eventKey))
            .then((res) => res.data);
    }

    summaryByCategoryLabel(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryLabel', eventKey))
            .then((res) => res.data);
    }

    summaryByCategoryKey(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byCategoryKey', eventKey))
            .then((res) => res.data);
    }

    summaryByStatus(eventKey) {
        return this.client.get(EventReports.summaryReportUrl('byStatus', eventKey))
            .then((res) => res.data);
    }

    static reportUrl(reportType, eventKey, filter) {
        if (filter === null || typeof filter === 'undefined') {
            return `/reports/events/${eventKey}/${reportType}`;
        }
        return `/reports/events/${eventKey}/${reportType}/${filter}`;
    }

    static summaryReportUrl(reportType, eventKey) {
        return `/reports/events/${eventKey}/${reportType}/summary`;
    }
}

module.exports = EventReports;
