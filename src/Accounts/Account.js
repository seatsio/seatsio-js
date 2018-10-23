class Account {
  constructor(secretKey, designerKey, publicKey, settings, email){
    this.secretKey = secretKey;
    this.designerKey = designerKey;
    this.publicKey = publicKey;
    this.settings = settings;
    this.email = email;
  }

  static create(){
    return Object.create(this.prototype);
  }
}

module.exports = Account;
