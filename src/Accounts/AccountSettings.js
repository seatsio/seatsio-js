class AccountSettings {
    constructor(draftChartDrawingsEnabled, chartValidation) {
        /* boolean  */
        this.draftChartDrawingsEnabled = draftChartDrawingsEnabled;
        /* ChartValidationSettings  */
        this.chartValidation = chartValidation;
    }
}

module.exports = AccountSettings;