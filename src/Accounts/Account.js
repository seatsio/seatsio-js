const ChartValidationSettings = require('./ChartValidationSettings.js')
const AccountSettings = require('./AccountSettings.js')

class Account {
  /**
   * @param {object} account
   */
  constructor (account) {
    let chartValidationSettings = new ChartValidationSettings(account.settings.chartValidation)

    this.secretKey = account.secretKey
    this.designerKey = account.designerKey
    this.publicKey = account.publicKey
    this.settings = new AccountSettings(account.settings.draftChartDrawingsEnabled, account.settings.holdOnSelectForGAs, account.settings.holdPeriodInMinutes, chartValidationSettings)
    this.email = account.email
    this.role = account.role
  }
}

module.exports = Account
