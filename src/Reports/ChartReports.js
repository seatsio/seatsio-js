class ChartReports{
  constructor(client){
    this.client = client;
  }

  byLabel(chartKey){
    return this.client.get(this.reportUrl('byLabel', chartKey)).then( (res) => res.data);
  }

  reportUrl(reportType, eventKey){
    return `/reports/charts/${eventKey}/${reportType}`;
  }
}

module.exports = ChartReports;
