class Account {
  /**
   * @param {string} secretKey
   * @param {string} designerKey
   * @param {string} publicKey
   * @param {AccountSettings} settings
   * @param {string} email
   * @param {string} role
   * @param {?string} definitionOfUse
   */
  constructor (secretKey, designerKey, publicKey, settings, email, role, definitionOfUse = null) {
    this.secretKey = secretKey
    this.designerKey = designerKey
    this.publicKey = publicKey
    this.settings = settings
    this.email = email
    this.role = role
    this.definitionOfUse = definitionOfUse
  }
}

module.exports = Account
