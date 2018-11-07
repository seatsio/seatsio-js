class ChartReports {
    constructor(client) {
        this.client = client;
    }

    static reportUrl(reportType, eventKey) {
        return `/reports/charts/${eventKey}/${reportType}`;
    }

    byLabel(chartKey) {
        return this.client.get(ChartReports.reportUrl('byLabel', chartKey)).then((res) => res.data);
    }
}

module.exports = ChartReports;
