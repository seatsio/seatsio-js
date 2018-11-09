class AccountSettings{
    constructor(draftChartDrawingsEnabled, chartValidation){
        this.draftChartDrawingsEnabled = draftChartDrawingsEnabled; /* boolean  */
        this.chartValidation = chartValidation; /* ChartValidationSettings  */
    }
}

module.exports = AccountSettings;