class Accounts{
  constructor(client){
    this.client = client;
  }

  retrieveMyAccount(){
    return this.client.get('/accounts/me');
  }
}

module.export = Accounts;
