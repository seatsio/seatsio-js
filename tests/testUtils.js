const SeatsioClient = require('../src/SeatsioClient.js');
const axios = require('axios');
const uuidv1 = require('uuid/v1');
const fs = require('fs');

module.exports = {
    'baseUrl' : 'https://api-staging.seatsio.net/',

    createTestUser: function () {
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

    createClient: function (key, baseUrl) {
        return new SeatsioClient(key, baseUrl);
    },
    
    createTestChartFromFile: function (filePath, designerKey) {
        var requestBody = fs.readFileSync(__dirname + filePath, 'utf-8');
        var client = axios.create();
        var chartKey = uuidv1();
        var url = `https://api-staging.seatsio.net/system/public/${designerKey}/charts/${chartKey}`;
        client.post(url, requestBody);
        return chartKey;
    }
}
