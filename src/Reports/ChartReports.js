const utilities = require('../utilities/reportUtility.js')

class ChartReports {
  constructor (client) {
    this.client = client
  }

  /**
   * @param {string} reportType
   * @param {string} eventKey
   * @returns {string}
   */
  static reportUrl (reportType, eventKey) {
    return `/reports/charts/${encodeURIComponent(eventKey)}/${reportType}`
  }

  /**
   * @param {string} chartKey
   * @returns {Object.<string, ChartReportItem[]>}
   */
  byLabel (chartKey) {
    return this.client.get(ChartReports.reportUrl('byLabel', chartKey))
      .then((res) => utilities.createChartReport(res.data))
  }

  /**
   * @param {string} chartKey
   * @returns {Object.<string, ChartReportItem[]>}
   */
  byCategoryLabel (chartKey) {
    return this.client.get(ChartReports.reportUrl('byCategoryLabel', chartKey))
      .then((res) => utilities.createChartReport(res.data))
  }

  /**
   * @param {string} chartKey
   * @returns {Object.<string, ChartReportItem[]>}
   */
  byCategoryKey (chartKey) {
    return this.client.get(ChartReports.reportUrl('byCategoryKey', chartKey))
      .then((res) => utilities.createChartReport(res.data))
  }
}

module.exports = ChartReports
