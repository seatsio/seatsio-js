const EventReportItem = require('./EventReportItem.js');

class EventReports {
    constructor(client) {
        this.client = client;
    }

    report(reportsData){
        let reportObjects = {};
        for(const key of Object.keys(reportsData)){
            reportObjects[key] = reportsData[key].map (data => {
                    return new EventReportItem(data.label, data.labels, data.status, data.categoryLabel, data.categoryKey, data.ticketType,
                        data.entrance, data.objectType, data.section, data.orderId, data.forSale, data.holdToken,
                        data.capacity, data.numBooked, data.extraData);
                }
            );
        }
        return reportObjects;
    }

    byLabel(eventKey, label = null) {
        return this.client.get(this.reportUrl('byLabel', eventKey, label))
            .then((res) => this.report(res.data));
    }

    byStatus(eventKey, status = null) {
        return this.client.get(this.reportUrl('byStatus', eventKey, status))
            .then((res) => this.report(res.data));
    }

    byCategoryLabel(eventKey, categoryLabel = null) {
        return this.client.get(this.reportUrl('byCategoryLabel', eventKey, categoryLabel))
            .then((res) => this.report(res.data));
    }

    byCategoryKey(eventKey, categoryKey = null) {
        return this.client.get(this.reportUrl('byCategoryKey', eventKey, categoryKey))
            .then((res) => this.report(res.data));
    }

    byOrderId(eventKey, orderId = null) {
        return this.client.get(this.reportUrl('byOrderId', eventKey, orderId))
            .then((res) => this.report(res.data));
    }

    bySection(eventKey, section = null) {
        return this.client.get(this.reportUrl('bySection', eventKey, section))
            .then((res) => this.report(res.data));
    }

    summaryBySection(eventKey) {
        return this.client.get(this.summaryReportUrl('bySection', eventKey))
            .then((res) => res.data);
    }

    summaryByCategoryLabel(eventKey) {
        return this.client.get(this.summaryReportUrl('byCategoryLabel', eventKey))
            .then((res) => res.data);
    }

    summaryByCategoryKey(eventKey) {
        return this.client.get(this.summaryReportUrl('byCategoryKey', eventKey))
            .then((res) => res.data);
    }

    summaryByStatus(eventKey) {
        return this.client.get(this.summaryReportUrl('byStatus', eventKey))
            .then((res) => res.data);
    }

    reportUrl(reportType, eventKey, filter) {
        if (filter === null || typeof filter === 'undefined') {
            return `/reports/events/${eventKey}/${reportType}`;
        }
        return `/reports/events/${eventKey}/${reportType}/${filter}`;
    }

    summaryReportUrl(reportType, eventKey) {
        return `/reports/events/${eventKey}/${reportType}/summary`;
    }
}

module.exports = EventReports;
