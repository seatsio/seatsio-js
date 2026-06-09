import { Axios } from 'axios'

export class UsageReports {
    client: Axios
    constructor (client: Axios) {
        this.client = client
    }

    summaryForAllMonths () {
        return this.client.get('/reports/usage?version=2')
            .then(res => ({
                usageCutoffDate: new Date(res.data.usageCutoffDate),
                usage: res.data.usage
            }))
    }

    billableRenderingsSummaryForAllMonths () {
        return this.client.get('/reports/usage/rendering')
            .then(res => res.data)
    }

    billableRenderingsForChartInMonth (chartKey: string, month: string) {
        return this.client.get(`/reports/usage/rendering/month/${month}/chart/${chartKey}`)
            .then(res => res.data)
    }

    detailsForMonth (month: string) {
        return this.client.get(`/reports/usage/month/${month}`)
            .then(res => res.data)
    }

    detailsForEventInMonth (eventId: number, month: string) {
        return this.client.get(`/reports/usage/month/${month}/event/${eventId}`)
            .then(res => res.data)
    }

    subscription () {
        return this.client.get('/reports/subscription')
            .then(res => res.data)
    }
}
