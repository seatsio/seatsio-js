const AccountSettings = require('./AccountSettings.js')

class Account {
  /**
   * @param {object} account
   */
  constructor (account) {
    this.secretKey = account.secretKey
    this.designerKey = account.designerKey
    this.publicKey = account.publicKey
    this.settings = new AccountSettings(account.settings)
    this.email = account.email
    this.role = account.role
  }
}

module.exports = Account
