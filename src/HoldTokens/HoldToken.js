class HoldToken{
  constructor(holdToken, expiresAt, expiresInSeconds){
    this.holdToken = holdToken;
    this.expiresAt = expiresAt;
    this.expiresInSeconds = expiresInSeconds;
  }
}

module.exports = HoldToken;
