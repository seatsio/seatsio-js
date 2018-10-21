const SeatsioClient = require('../src/SeatsioClient.js'),
      axios = require('axios'),
      uuidv1 = require('uuid/v1'),
      uuidv4 = require('uuid/v4'),
      fs = require('fs');

class SeatsioClientTest {

  constructor(){
    this.baseUrl = 'https://api-staging.seatsio.net/';
    this.user = "";
    this.client = "";
  }

  createTestUser(){
    var testAccount = axios({
      method: 'POST',
      url: this.baseUrl + 'system/public/users/actions/create-test-user'
    }).then(response => {
      this.user =  response.data;
    }).catch(error => {
      console.log(error);
    });
  }

  createSeatsioClient(){
    this.client = new SeatsioClient(this.user.secretKey, this.baseUrl);
  }

  createTestChart(){
    return this.createTestChartFromFile(__dirname + '/sampleChart.json');
  }

  createTestChartWithSections(){
    return this.createTestChartFromFile(__dirname + '/sampleChartWithSections.json');
  }

  createTestChartWithTables(){
    return this.createTestChartFromFile(__dirname + '/sampleChartWithTables.json');
  }

  createTestChartFromFile(file){
    var requestBody = fs.readFileSync(file);
    var chartKey = uuidv4();
    var client = axios.create();
    var url = this.baseUrl + 'system/public/' + this.user.designerKey + '/charts/' + chartKey;
    client.post(url, requestBody)
      .then( (response) => console.log("Chart created in seatsioClientTest"))
      .catch( err => console.log("Chart from file creation error: " + err));
    return chartKey;
  }

}

/*
var test = new SeatsioClientTest();

test.createTestUser();
test.createSeatsioClient();

setTimeout( () => console.log("Chart key: " + test.createTestChart()), 3000);
setTimeout( () => console.log("Section Chart key: " + test.createTestChartWithSections()), 3000);
setTimeout( () => console.log("Table Chart key: " + test.createTestChartWithTables()), 3000);
setTimeout( () => console.log(test), 2000);
*/

module.exports = SeatsioClientTest;

//Chart keys are created with uuid function BUT not returned as a result of the api call, manually check on the server
//https://api-staging.seatsio.net/charts/CHARTKEY
//enter secretPassword for the testuser in username, leave password empty
