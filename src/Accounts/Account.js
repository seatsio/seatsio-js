class Account {
  constructor(secretKey, designerKey, publicKey, settings, email){
    this.secretKey = secretKey;
    this.designerKey = designerKey;
    this.publicKey = publicKey;
    this.settings = settings;
    this.email = email;
  }
}

module.exports = Account;
