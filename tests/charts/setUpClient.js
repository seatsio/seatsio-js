const SeatsioClient = require('../../src/SeatsioClient.js');
const axios = require('axios');

module.exports = {
  createTestUser: function(){
    var baseUrl = 'https://api-staging.seatsio.net/';

    var testUserPr = axios({
      method: 'POST',
      url: baseUrl + 'system/public/users/actions/create-test-user'
    }).then(response => {
      return response.data;
    }).catch(error => {
      console.log(error);
    });

    return testUserPr;
  },
  createClient: function (key, baseUrl){
    return new SeatsioClient(key, baseUrl);
  }
}
