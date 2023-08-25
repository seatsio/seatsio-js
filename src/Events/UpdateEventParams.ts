import { AbstractEventParams } from './AbstractEventParams'

export class UpdateEventParams extends AbstractEventParams {
    chartKey?: string
    isInThePast?: boolean

    withChartKey (chartKey: string) {
        this.chartKey = chartKey
        return this
    }

    withIsInThePast(isInThePast: boolean) {
        this.isInThePast = isInThePast
        return this
    }
}
