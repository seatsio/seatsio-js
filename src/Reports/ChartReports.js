const utilities = require('../utilities.js');

class ChartReports {
    constructor(client) {
        this.client = client;
    }

    /* @return string */
    static reportUrl(reportType, eventKey) {
        return `/reports/charts/${eventKey}/${reportType}`;
    }

    /* @return ChartReportItem */
    byLabel(chartKey) {
        return this.client.get(ChartReports.reportUrl('byLabel', chartKey))
            .then((res) => utilities.createChartReport(res.data));
    }
}

module.exports = ChartReports;
