const Chart = require('../Charts/Chart.js');
const PageFetcher = require('../PageFetcher.js');

class Accounts{
  constructor(client){
    this.client = client;
  }

  retrieveMyAccount(){
    var res = this.client.get('/accounts/me');
    return res.data;
  }
}

module.export = Accounts;
