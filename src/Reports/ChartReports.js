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
     * @param {string} bookWholeTables
     * @returns {Object} JSON response from the server
     */
    summaryByObjectType (chartKey, bookWholeTables = undefined) {
        return this.fetchSummaryReport('byObjectType', chartKey, bookWholeTables)
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
     * @param {string} bookWholeTables
     * @returns {Object} JSON response from the server
     */
    summaryByCategoryLabel (chartKey, bookWholeTables = undefined) {
        return this.fetchSummaryReport('byCategoryLabel', chartKey, bookWholeTables)
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
     * @param {string} bookWholeTables
     * @returns {Object} JSON response from the server
     */
    summaryByCategoryKey (chartKey, bookWholeTables = undefined) {
        return this.fetchSummaryReport('byCategoryKey', chartKey, bookWholeTables)
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
     * @param {string} bookWholeTables
     * @returns {Object} JSON response from the server
     */
    summaryBySection (chartKey, bookWholeTables = undefined) {
        return this.fetchSummaryReport('bySection', chartKey, bookWholeTables)
    }

    fetchReport (reportType, chartKey, bookWholeTables) {
        return this.client.get(`/reports/charts/${encodeURIComponent(chartKey)}/${reportType}`, { params: { bookWholeTables } })
            .then((res) => utilities.createChartReport(res.data))
    }

    fetchSummaryReport (reportType, chartKey, bookWholeTables) {
        return this.client.get(`/reports/charts/${encodeURIComponent(chartKey)}/${reportType}/summary`, { params: { bookWholeTables } })
            .then((res) => res.data)
    }
}

module.exports = ChartReports
