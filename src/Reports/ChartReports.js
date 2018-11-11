const ChartReportItem = require('./ChartReportItem.js');

class ChartReports {
    constructor(client) {
        this.client = client;
    }

    report(reportsData){
        let reportObjects = {};
        for(const key of Object.keys(reportsData)){
            reportObjects[key] = reportsData[key].map (data => {
                    return new ChartReportItem(data.label, data.labels, data.categoryLabel, data.categoryKey, data.entrance,
                        data.objectType, data.section,
                        data.capacity);
                }
            );
        }
        return reportObjects;
    }

    static reportUrl(reportType, eventKey) {
        return `/reports/charts/${eventKey}/${reportType}`;
    }

    byLabel(chartKey) {
        return this.client.get(ChartReports.reportUrl('byLabel', chartKey)).then((res) => this.report(res.data));
    }
}

module.exports = ChartReports;
