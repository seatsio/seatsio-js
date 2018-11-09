const Account = require('./Account.js');
const AccountSettings = require('./AccountSettings.js');
const ChartValidationSettings = require('./ChartValidationSettings.js');

class Accounts {
    constructor(client) {
        this.client = client;
    }

    retrieveMyAccount() {
        return this.client.get('/accounts/me').then((res) => Accounts.accountCreator(res.data));
    }

    static accountCreator(accountData){
        let chartValidation = accountData.settings.chartValidation;
        let settings = new AccountSettings(accountData.settings.draftChartDrawingsEnabled, new ChartValidationSettings(chartValidation.VALIDATE_DUPLICATE_LABELS, chartValidation.VALIDATE_OBJECTS_WITHOUT_CATEGORIES, chartValidation.VALIDATE_UNLABELED_OBJECTS,));
        return new Account(accountData.secretKey, accountData.designerKey, accountData.publicKey, settings, accountData.email);
    }
}

module.exports = Accounts;