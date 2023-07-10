import { AbstractEventParams } from './AbstractEventParams'

export class UpdateEventParams extends AbstractEventParams {
    chartKey?: string

    withChartKey (chartKey: string) {
        this.chartKey = chartKey
        return this
    }
}
