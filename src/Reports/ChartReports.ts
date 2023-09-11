import { Utilities } from '../utilities/reportUtility'
import { Axios } from 'axios'

export class Versions {
    public static publishedVersion: string = 'published'
    public static draftVersion: string = 'draft'
}

export class ChartReports {
    client: Axios
    constructor (client: Axios) {
        this.client = client
    }

    byLabel (chartKey: string, bookWholeTables?: string, version?: string) {
        return this.fetchReport('byLabel', chartKey, bookWholeTables, version)
    }

    byObjectType (chartKey: string, bookWholeTables?: string, version?: string) {
        return this.fetchReport('byObjectType', chartKey, bookWholeTables, version)
    }

    summaryByObjectType (chartKey: string, bookWholeTables?: string, version?: string) {
        return this.fetchSummaryReport('byObjectType', chartKey, bookWholeTables, version)
    }

    byCategoryLabel (chartKey: string, bookWholeTables?: string, version?: string) {
        return this.fetchReport('byCategoryLabel', chartKey, bookWholeTables, version)
    }

    summaryByCategoryLabel (chartKey: string, bookWholeTables?: string, version?: string) {
        return this.fetchSummaryReport('byCategoryLabel', chartKey, bookWholeTables, version)
    }

    byCategoryKey (chartKey: string, bookWholeTables?: string, version?: string) {
        return this.fetchReport('byCategoryKey', chartKey, bookWholeTables, version)
    }

    summaryByCategoryKey (chartKey: string, bookWholeTables?: string, version?: string) {
        return this.fetchSummaryReport('byCategoryKey', chartKey, bookWholeTables, version)
    }

    bySection (chartKey: string, bookWholeTables?: string, version?: string) {
        return this.fetchReport('bySection', chartKey, bookWholeTables, version)
    }

    summaryBySection (chartKey: string, bookWholeTables?: string, version?: string) {
        return this.fetchSummaryReport('bySection', chartKey, bookWholeTables, version)
    }

    fetchReport (reportType: string, chartKey: string, bookWholeTables?: string, version?: string) {
        return this.client.get(`/reports/charts/${encodeURIComponent(chartKey)}/${reportType}`, { params: { bookWholeTables, version } })
            .then(res => Utilities.createChartReport(res.data))
    }

    fetchSummaryReport (reportType: string, chartKey: string, bookWholeTables?: string, version?: string) {
        return this.client.get(`/reports/charts/${encodeURIComponent(chartKey)}/${reportType}/summary`, { params: { bookWholeTables, version } })
            .then(res => res.data)
    }
}
