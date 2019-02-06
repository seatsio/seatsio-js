class AccountSettings {
  /**
   * @param {boolean} draftChartDrawingsEnabled
   * @param {boolean} holdOnSelectForGAs
   * @param {number} holdPeriodInMinutes
   * @param {ChartValidationSettings} chartValidation
   */
  constructor (draftChartDrawingsEnabled, holdOnSelectForGAs, holdPeriodInMinutes, chartValidation) {
    this.draftChartDrawingsEnabled = draftChartDrawingsEnabled
    this.holdOnSelectForGAs = holdOnSelectForGAs
    this.holdPeriodInMinutes = holdPeriodInMinutes
    this.chartValidation = chartValidation
  }
}

module.exports = AccountSettings
