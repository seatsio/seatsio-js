class HoldTokens{
  constructor(client){
    this.client = client;
  }

  create(expiresInMinutes = null){
    var request = {};
    if(expiresInMinutes){
      request.expiresInMinutes = expiresInMinutes;
    }
    return this.client.post('/hold-tokens', request).then( (res) => res.data);
  }
}

module.exports = HoldTokens;
