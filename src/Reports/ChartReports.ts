import { Utilities } from '../utilities/reportUtility'

export class ChartReports {
    client: any
    constructor (client: any) {
        this.client = client
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartObjectInfo[]>}
     */
    byLabel (chartKey: any, bookWholeTables = undefined) {
        return this.fetchReport('byLabel', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartObjectInfo[]>}
     */
    byObjectType (chartKey: any, bookWholeTables = undefined) {
        return this.fetchReport('byObjectType', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {object} JSON response from the server
     */
    summaryByObjectType (chartKey: any, bookWholeTables = undefined) {
        return this.fetchSummaryReport('byObjectType', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartObjectInfo[]>}
     */
    byCategoryLabel (chartKey: any, bookWholeTables = undefined) {
        return this.fetchReport('byCategoryLabel', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {object} JSON response from the server
     */
    summaryByCategoryLabel (chartKey: any, bookWholeTables = undefined) {
        return this.fetchSummaryReport('byCategoryLabel', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartObjectInfo[]>}
     */
    byCategoryKey (chartKey: any, bookWholeTables = undefined) {
        return this.fetchReport('byCategoryKey', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {object} JSON response from the server
     */
    summaryByCategoryKey (chartKey: any, bookWholeTables = undefined) {
        return this.fetchSummaryReport('byCategoryKey', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {Object.<string, ChartObjectInfo[]>}
     */
    bySection (chartKey: any, bookWholeTables = undefined) {
        return this.fetchReport('bySection', chartKey, bookWholeTables)
    }

    /**
     * @param {string} chartKey
     * @param {string} bookWholeTables
     * @returns {object} JSON response from the server
     */
    summaryBySection (chartKey: any, bookWholeTables = undefined) {
        return this.fetchSummaryReport('bySection', chartKey, bookWholeTables)
    }

    fetchReport (reportType: any, chartKey: any, bookWholeTables: any) {
        return this.client.get(`/reports/charts/${encodeURIComponent(chartKey)}/${reportType}`, { params: { bookWholeTables } })
            .then((res: any) => Utilities.createChartReport(res.data))
    }

    fetchSummaryReport (reportType: any, chartKey: any, bookWholeTables: any) {
        return this.client.get(`/reports/charts/${encodeURIComponent(chartKey)}/${reportType}/summary`, { params: { bookWholeTables } })
            .then((res: any) => res.data)
    }
}
