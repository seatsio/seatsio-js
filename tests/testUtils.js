const SeatsioClient = require('../src/SeatsioClient.js');
const axios = require('axios');
const uuidv4 = require('uuid/v4');

module.exports = {
    'baseURL' : 'https://api-staging.seatsio.net/',

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

    createTestChartFromFile: function (file, designerKey, chartKey) {
        var requestBody = fs.readFileSync(file);
        var chartReq = axios.create();
        var url = `https://api-staging.seatsio.net/system/public/${designerKey}/charts/${chartKey}`;
        return chartReq.post(url, requestBody);
    }
}