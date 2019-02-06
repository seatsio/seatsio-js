class Account {
  /**
     * @param {string} secretKey
     * @param {string} designerKey
     * @param {string} publicKey
     * @param {AccountSettings} settings
     * @param {string} email
     */
  constructor (secretKey, designerKey, publicKey, settings, email) {
    this.secretKey = secretKey
    this.designerKey = designerKey
    this.publicKey = publicKey
    this.settings = settings
    this.email = email
  }
}

module.exports = Account
