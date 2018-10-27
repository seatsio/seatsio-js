class Subaccounts{

  constructor(client){
    this.client = client;
  }

  create(name = null){
    return this.doCreate(null, name);
  }

  createWithEmail(email, name = null){
    return this.doCreate(email, name);
  }

  doCreate(email = null, name = null){
    var requestParams = {};

    if(name !== null){
      requestParams.name = name;
    }

    if(email !== null){
      requestParams.email = email;
    }

    return this.client.post('/subaccounts', requestParams)
                      .then( (res) => res.data );
  }
}

module.exports = Subaccounts;
