class AccountSettings {
    /**
     * @param {boolean} draftChartDrawingsEnabled
     * @param {ChartValidationSettings} chartValidation
     */
    constructor(draftChartDrawingsEnabled, chartValidation) {
        this.draftChartDrawingsEnabled = draftChartDrawingsEnabled;
        this.chartValidation = chartValidation;
    }
}

module.exports = AccountSettings;