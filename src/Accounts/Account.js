class Account {
  /**
   * @param {string} secretKey
   * @param {string} designerKey
   * @param {string} publicKey
   * @param {AccountSettings} settings
   * @param {string} email
   * @param {string} role
   */
  constructor (secretKey, designerKey, publicKey, settings, email, role) {
    this.secretKey = secretKey
    this.designerKey = designerKey
    this.publicKey = publicKey
    this.settings = settings
    this.email = email
    this.role = role
  }
}

module.exports = Account
