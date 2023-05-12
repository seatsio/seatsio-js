import { Utilities } from '../utilities/reportUtility'

export class ChartReports {
    client: any
    constructor (client: any) {
        this.client = client
    }

    byLabel (chartKey: any, bookWholeTables = undefined) {
        return this.fetchReport('byLabel', chartKey, bookWholeTables)
    }

    byObjectType (chartKey: any, bookWholeTables = undefined) {
        return this.fetchReport('byObjectType', chartKey, bookWholeTables)
    }

    summaryByObjectType (chartKey: any, bookWholeTables = undefined) {
        return this.fetchSummaryReport('byObjectType', chartKey, bookWholeTables)
    }

    byCategoryLabel (chartKey: any, bookWholeTables = undefined) {
        return this.fetchReport('byCategoryLabel', chartKey, bookWholeTables)
    }

    summaryByCategoryLabel (chartKey: any, bookWholeTables = undefined) {
        return this.fetchSummaryReport('byCategoryLabel', chartKey, bookWholeTables)
    }

    byCategoryKey (chartKey: any, bookWholeTables = undefined) {
        return this.fetchReport('byCategoryKey', chartKey, bookWholeTables)
    }

    summaryByCategoryKey (chartKey: any, bookWholeTables = undefined) {
        return this.fetchSummaryReport('byCategoryKey', chartKey, bookWholeTables)
    }

    bySection (chartKey: any, bookWholeTables = undefined) {
        return this.fetchReport('bySection', chartKey, bookWholeTables)
    }

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
