const ChartValidationSettings = require('./ChartValidationSettings.js')
const AccountSettings = require('./AccountSettings.js')

class Account {
  /**
   * @param {object} account
   */
  constructor (account) {
    let chartValidation = account.settings.chartValidation
    let chartValidationSettings = new ChartValidationSettings(chartValidation.VALIDATE_DUPLICATE_LABELS, chartValidation.VALIDATE_OBJECTS_WITHOUT_CATEGORIES, chartValidation.VALIDATE_UNLABELED_OBJECTS, chartValidation.VALIDATE_FOCAL_POINT, chartValidation.VALIDATE_OBJECT_TYPES_PER_CATEGORY, account.settings.chartValidation)

    this.secretKey = account.secretKey
    this.designerKey = account.designerKey
    this.publicKey = account.publicKey
    this.settings = new AccountSettings(account.settings.draftChartDrawingsEnabled, account.settings.holdOnSelectForGAs, account.settings.holdPeriodInMinutes, chartValidationSettings)
    this.email = account.email
    this.role = account.role
  }
}

module.exports = Account
