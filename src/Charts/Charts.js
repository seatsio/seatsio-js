const PageFetcher = require('../PageFetcher.js');
const Chart = require('./Chart.js');

class Charts {
  constructor(client){
    this.client = client;
    //more code here
  }

  create(name = null, venueType = null, categories = null){
    var requestParams = {};

    if(name !== null){
      requestParams.name = name;
    }

    if(venueType !== null){
      requestParams.venueType = venueType;
    }

    if(categories !== null){
      requestParams.categories = categories;
    }

    //Axios api call is not working, status error 401
    var res = this.client.post('charts', JSON.stringify(requestParams))
                         .then( (res) => console.log("Chart creation successful."))
                         .catch( (err) => console.log("Chart creation is not successful: " + err));
    //need to map result into the Chart class
  }

  retrieve(key){
    var res = this.client.get('charts/' + key)
                         .then( (res) => console.log("Chart retrieve successful. "))
                         .catch( (err) => console.log("Chart retrieve is not successful: " + err));
  }

}

module.exports = Charts;
