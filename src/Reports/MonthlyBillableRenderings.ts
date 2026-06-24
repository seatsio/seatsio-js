import { Month } from '../Common/Month.js'

export class ChartBillableRenderings {
    chartKey: string
    numBillableRenderings: number

    constructor (chartKey: string, numBillableRenderings: number) {
        this.chartKey = chartKey
        this.numBillableRenderings = numBillableRenderings
    }
}

export class WorkspaceBillableRenderings {
    workspaceKey: string
    workspaceId: number
    usage: { [chartKey: string]: ChartBillableRenderings }

    constructor (workspaceKey: string, workspaceId: number, usage: { [chartKey: string]: ChartBillableRenderings }) {
        this.workspaceKey = workspaceKey
        this.workspaceId = workspaceId
        this.usage = usage
    }
}

export class MonthlyBillableRenderings {
    companyId: number
    month: Month
    usage: { [workspaceKey: string]: WorkspaceBillableRenderings }

    constructor (companyId: number, month: Month, usage: { [workspaceKey: string]: WorkspaceBillableRenderings }) {
        this.companyId = companyId
        this.month = month
        this.usage = usage
    }

    static fromJson (data: any): MonthlyBillableRenderings {
        const month = new Month(data.month.year, data.month.month)
        const usage: { [k: string]: WorkspaceBillableRenderings } = {}
        for (const workspaceKey of Object.keys(data.usage)) {
            const ws = data.usage[workspaceKey]
            const chartUsage: { [k: string]: ChartBillableRenderings } = {}
            for (const chartKey of Object.keys(ws.usage)) {
                const c = ws.usage[chartKey]
                chartUsage[chartKey] = new ChartBillableRenderings(c.chartKey, c.numBillableRenderings)
            }
            usage[workspaceKey] = new WorkspaceBillableRenderings(ws.workspaceKey, ws.workspaceId, chartUsage)
        }
        return new MonthlyBillableRenderings(data.companyId, month, usage)
    }
}
