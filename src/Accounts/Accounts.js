class Accounts{
  constructor(client){
    this.client = client;
  }

  retrieveMyAccount(){
    return this.client.get('/accounts/me').then( (res) => res.data);
  }
}

module.exports = Accounts;
