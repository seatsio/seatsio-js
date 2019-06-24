const ChartValidationSettings = require('./ChartValidationSettings.js')

class AccountSettings {
    /**
   * @param {object} settings
   */
    constructor (settings) {
        this.draftChartDrawingsEnabled = settings.draftChartDrawingsEnabled
        this.holdOnSelectForGAs = settings.holdOnSelectForGAs
        this.holdPeriodInMinutes = settings.holdPeriodInMinutes
        this.chartValidation = new ChartValidationSettings(settings.chartValidation)
    }
}

module.exports = AccountSettings
