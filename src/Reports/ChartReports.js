const utilities = require('../utilities/reportUtility.js')

class ChartReports {
    constructor (client) {
        this.client = client
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartObjectInfo[]>}
     */
    byLabel (chartKey, bookWholeTables = undefined) {
        return this.fetchReport('byLabel', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartObjectInfo[]>}
     */
    byObjectType (chartKey, bookWholeTables = undefined) {
        return this.fetchReport('byObjectType', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @returns {Object} JSON response from the server
     */
    summaryByObjectType (chartKey) {
        return this.client.get(ChartReports.summaryReportUrl('byObjectType', chartKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartObjectInfo[]>}
     */
    byCategoryLabel (chartKey, bookWholeTables = undefined) {
        return this.fetchReport('byCategoryLabel', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @returns {Object} JSON response from the server
     */
    summaryByCategoryLabel (chartKey) {
        return this.client.get(ChartReports.summaryReportUrl('byCategoryLabel', chartKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartObjectInfo[]>}
     */
    byCategoryKey (chartKey, bookWholeTables = undefined) {
        return this.fetchReport('byCategoryKey', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @returns {Object} JSON response from the server
     */
    summaryByCategoryKey (chartKey) {
        return this.client.get(ChartReports.summaryReportUrl('byCategoryKey', chartKey))
            .then((res) => res.data)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartObjectInfo[]>}
     */
    bySection (chartKey, bookWholeTables = undefined) {
        return this.fetchReport('bySection', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @returns {Object} JSON response from the server
     */
    summaryBySection (chartKey) {
        return this.client.get(ChartReports.summaryReportUrl('bySection', chartKey))
            .then((res) => res.data)
    }

    fetchReport (reportType, eventKey, bookWholeTables) {
        return this.client.get(`/reports/charts/${encodeURIComponent(eventKey)}/${reportType}`, { params: { bookWholeTables } })
            .then((res) => utilities.createChartReport(res.data))
    }

    static summaryReportUrl (reportType, eventKey) {
        return `/reports/charts/${encodeURIComponent(eventKey)}/${reportType}/summary`
    }
}

module.exports = ChartReports
