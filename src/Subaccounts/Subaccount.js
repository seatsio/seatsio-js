class Subaccount{
  constructor(id, secretKey, designerKey, publicKey, name, email, active){
    this.id = id;
    this.secretKey = secretKey;
    this.designerKey = designerKey;
    this.publicKey = publicKey;
    this.name = name;
    this.email = email;
    this.active = active;
  }

  static create(){
    return Object.create(this.prototype);
  }
}

module.exports = Subaccount;
