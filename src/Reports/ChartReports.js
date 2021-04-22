const utilities = require('../utilities/reportUtility.js')

class ChartReports {
    constructor (client) {
        this.client = client
    }

    fetchReport (reportType, eventKey, bookWholeTables) {
        return this.client.get(`/reports/charts/${encodeURIComponent(eventKey)}/${reportType}`, { params: { bookWholeTables } })
            .then((res) => utilities.createChartReport(res.data))
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartReportItem[]>}
     */
    byLabel (chartKey, bookWholeTables = undefined) {
        return this.fetchReport('byLabel', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartReportItem[]>}
     */
    byObjectType (chartKey, bookWholeTables = undefined) {
        return this.fetchReport('byObjectType', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartReportItem[]>}
     */
    byCategoryLabel (chartKey, bookWholeTables = undefined) {
        return this.fetchReport('byCategoryLabel', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartReportItem[]>}
     */
    byCategoryKey (chartKey, bookWholeTables = undefined) {
        return this.fetchReport('byCategoryKey', chartKey, bookWholeTables)
    }
}

module.exports = ChartReports
