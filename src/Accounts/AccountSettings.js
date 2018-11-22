class AccountSettings {
    constructor(draftChartDrawingsEnabled, holdOnSelectForGAs, chartValidation) {
        /* boolean  */
        this.draftChartDrawingsEnabled = draftChartDrawingsEnabled;
        /* boolean  */
        this.holdOnSelectForGAs = holdOnSelectForGAs;
        /* ChartValidationSettings  */
        this.chartValidation = chartValidation;
    }
}

module.exports = AccountSettings;