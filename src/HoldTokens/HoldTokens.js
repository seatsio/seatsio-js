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

  retrieve(holdToken){
    return this.client.get(`/hold-tokens/${holdToken}`).then( (res) => res.data);
  }

  expiresInMinutes(holdToken, minutes){
    var request = {};
    request.expiresInMinutes = minutes;
    return this.client.post(`/hold-tokens/${holdToken}`, request).then( (res) => res.data);
  }
}

module.exports = HoldTokens;
