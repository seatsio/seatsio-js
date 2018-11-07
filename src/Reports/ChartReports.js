class ChartReports{
  constructor(client){
    this.client = client;
  }

  byLabel(chartKey){
    return this.client.get(ChartReports.reportUrl('byLabel', chartKey)).then( (res) => res.data);
  }

  static reportUrl(reportType, eventKey){
    return `/reports/charts/${eventKey}/${reportType}`;
  }
}

module.exports = ChartReports;
