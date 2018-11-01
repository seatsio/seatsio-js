const Subaccount = require('./Subaccount.js');
const Lister = require('./Lister.js');
const Page = require('../Page.js');
const PageFetcher = require('../PageFetcher.js');

class Subaccounts{

  constructor(client){
    this.client = client;
    this.active = new Lister(new PageFetcher('/subaccounts/active', this.client, function (results) {
      var subaccountItems = results.items.map((data) => {
        return new Subaccount(data.id, data.secretKey, data.designerKey,
                        data.publicKey, data.name, data.email, data.active);
      });
      return new Page(subaccountItems);
    }));
    this.inactive = new Lister(new PageFetcher('/subaccounts/inactive', this.client, function (results) {
      var subaccountItems = results.items.map((data) => {
        return new Subaccount(data.id, data.secretKey, data.designerKey,
                        data.publicKey, data.name, data.email, data.active);
      });
      return new Page(subaccountItems);
    }));
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

    if(name !== null){
      request.name = name;
    }

    if(email !== null){
      request.email = email;
    }

    return this.client.post(`/subaccounts/${id}`, request);
  }

  regenerateSecretKey(id){
    return this.client.post(`/subaccounts/${id}/secret-key/actions/regenerate`).then( (res) => res.data);
  }

  regenerateDesignerKey(id){
    return this.client.post(`/subaccounts/${id}/designer-key/actions/regenerate`).then( (res) => res.data);
  }

  listAll(){
    return this.iterator().all();
  }

  iterator(){
    return new Lister(new PageFetcher('/subaccounts', this.client, (results) => {
      var subaccountItems = results.items.map((data) => {
        return new Subaccount(data.id, data.secretKey, data.designerKey,
                        data.publicKey, data.name, data.email, data.active);
      });
      return new Page(subaccountItems);
    }));
  }
}

module.exports = Subaccounts;
