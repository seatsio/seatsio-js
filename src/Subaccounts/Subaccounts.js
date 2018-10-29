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

  copyChartToSubaccount(fromId, toId, chartKey){
    return this.client.post(`/subaccounts/${fromId}/charts/${chartKey}/actions/copy-to/${toId}`).then( (res) => res.data);
  }

  copyChartToParent(id, chartKey){
    return this.client.post(`/subaccounts/${id}/charts/${chartKey}/actions/copy-to/parent`).then( (res) => res.data);
  }

  activate(id)
  {
    return this.client.post(`/subaccounts/${id}/actions/activate`);
  }

  deactivate(id)
  {
    return this.client.post(`/subaccounts/${id}/actions/deactivate`);
  }

  retrieve(id){
    return this.client.get(`/subaccounts/${id}`).then( (res) => res.data);
  }

  update(id, name, email){
    var request = {};

    if(name){
      request.name = name;
    }

    if(email){
      request.email = email;
    }

    return this.client.post(`/subaccounts/${id}`, request);
  }
}

module.exports = Subaccounts;
