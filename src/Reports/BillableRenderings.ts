import { Month } from '../Common/Month.js'
import { ChartBillableRenderings, WorkspaceBillableRenderings } from './MonthlyBillableRenderings.js'

export class MonthBillableRenderings {
    month: Month
    usage: { [workspaceKey: string]: WorkspaceBillableRenderings }

    constructor (month: Month, usage: { [workspaceKey: string]: WorkspaceBillableRenderings }) {
        this.month = month
        this.usage = usage
    }
}

export class BillableRenderings {
    companyId: number
    usage: { [monthKey: string]: MonthBillableRenderings }

    constructor (companyId: number, usage: { [monthKey: string]: MonthBillableRenderings }) {
        this.companyId = companyId
        this.usage = usage
    }

    static fromJson (data: any): BillableRenderings {
        const usage: { [monthKey: string]: MonthBillableRenderings } = {}
        for (const monthKey of Object.keys(data.usage)) {
            const monthEntry = data.usage[monthKey]
            const month = new Month(monthEntry.month.year, monthEntry.month.month)
            const workspaces: { [workspaceKey: string]: WorkspaceBillableRenderings } = {}
            for (const [workspaceKey, ws] of Object.entries<any>(monthEntry.usage)) {
                const chartUsage: { [chartKey: string]: ChartBillableRenderings } = {}
                for (const chartKey of Object.keys(ws.usage)) {
                    const c = ws.usage[chartKey]
                    chartUsage[chartKey] = new ChartBillableRenderings(c.chartKey, c.numBillableRenderings)
                }
                workspaces[workspaceKey] = new WorkspaceBillableRenderings(ws.workspaceKey, ws.workspaceId, chartUsage)
            }
            usage[monthKey] = new MonthBillableRenderings(month, workspaces)
        }
        return new BillableRenderings(data.companyId, usage)
    }
}
