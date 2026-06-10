import { ChartValidationSettings } from './ChartValidationSettings.js'
import { DefaultRendererSettings } from './DefaultRendererSettings.js'
import { Dict } from '../Dict.js'

type AccountSettingsJson = Dict<any>

export class AccountSettings {
    chartValidation: ChartValidationSettings
    defaultRendererSettings: DefaultRendererSettings
    draftChartDrawingsEnabled: boolean
    holdOnSelectForGAs: boolean
    holdPeriodInMinutes: number

    constructor (settings: AccountSettingsJson) {
        this.draftChartDrawingsEnabled = settings.draftChartDrawingsEnabled
        this.holdOnSelectForGAs = settings.holdOnSelectForGAs
        this.holdPeriodInMinutes = settings.holdPeriodInMinutes
        this.chartValidation = new ChartValidationSettings(settings.chartValidation)
        this.defaultRendererSettings = new DefaultRendererSettings(settings.defaultRendererSettings)
    }
}
