import { Utilities } from '../utilities/reportUtility'
import { Axios } from 'axios'

export class ChartReports {
    client: Axios
    constructor (client: Axios) {
        this.client = client
    }

    byLabel (chartKey: string, bookWholeTables?: string) {
        return this.fetchReport('byLabel', chartKey, bookWholeTables)
    }

    byObjectType (chartKey: string, bookWholeTables?: string) {
        return this.fetchReport('byObjectType', chartKey, bookWholeTables)
    }

    summaryByObjectType (chartKey: string, bookWholeTables?: string) {
        return this.fetchSummaryReport('byObjectType', chartKey, bookWholeTables)
    }

    byCategoryLabel (chartKey: string, bookWholeTables?: string) {
        return this.fetchReport('byCategoryLabel', chartKey, bookWholeTables)
    }

    summaryByCategoryLabel (chartKey: string, bookWholeTables?: string) {
        return this.fetchSummaryReport('byCategoryLabel', chartKey, bookWholeTables)
    }

    byCategoryKey (chartKey: string, bookWholeTables?: string) {
        return this.fetchReport('byCategoryKey', chartKey, bookWholeTables)
    }

    summaryByCategoryKey (chartKey: string, bookWholeTables?: string) {
        return this.fetchSummaryReport('byCategoryKey', chartKey, bookWholeTables)
    }

    bySection (chartKey: string, bookWholeTables?: string) {
        return this.fetchReport('bySection', chartKey, bookWholeTables)
    }

    summaryBySection (chartKey: string, bookWholeTables?: string) {
        return this.fetchSummaryReport('bySection', chartKey, bookWholeTables)
    }

    fetchReport (reportType: string, chartKey: string, bookWholeTables?: string) {
        return this.client.get(`/reports/charts/${encodeURIComponent(chartKey)}/${reportType}`, { params: { bookWholeTables } })
            .then(res => Utilities.createChartReport(res.data))
    }

    fetchSummaryReport (reportType: string, chartKey: string, bookWholeTables?: string) {
        return this.client.get(`/reports/charts/${encodeURIComponent(chartKey)}/${reportType}/summary`, { params: { bookWholeTables } })
            .then(res => res.data)
    }
}
