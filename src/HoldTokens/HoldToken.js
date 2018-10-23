class HoldToken{
  constructor(holdToken, expiresAt, expiresInSeconds){
    this.holdToken = holdToken;
    this.expiresAt = expiresAt;
    this.expiresInSeconds = expiresInSeconds;
  }

  static create(){
    return Object.create(this.prototype);
  }
}

module.exports = HoldToken;
