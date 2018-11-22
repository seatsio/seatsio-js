class AccountSettings {
    /**
     * @param {boolean} draftChartDrawingsEnabled
     * @param {boolean} holdOnSelectForGAs
     * @param {ChartValidationSettings} chartValidation
     */
    constructor(draftChartDrawingsEnabled, holdOnSelectForGAs, chartValidation) {
        this.draftChartDrawingsEnabled = draftChartDrawingsEnabled;
        this.holdOnSelectForGAs = holdOnSelectForGAs;
        this.chartValidation = chartValidation;
    }
}

module.exports = AccountSettings;