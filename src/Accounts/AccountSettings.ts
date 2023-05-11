import { ChartValidationSettings } from './ChartValidationSettings'
import { DefaultRendererSettings } from './DefaultRendererSettings'

export class AccountSettings {
    chartValidation: any
    defaultRendererSettings: any
    draftChartDrawingsEnabled: any
    holdOnSelectForGAs: any
    holdPeriodInMinutes: any

    constructor (settings: any) {
        this.draftChartDrawingsEnabled = settings.draftChartDrawingsEnabled
        this.holdOnSelectForGAs = settings.holdOnSelectForGAs
        this.holdPeriodInMinutes = settings.holdPeriodInMinutes
        this.chartValidation = new ChartValidationSettings(settings.chartValidation)
        this.defaultRendererSettings = new DefaultRendererSettings(settings.defaultRendererSettings)
    }
}
