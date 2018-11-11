const SeatsioClient = require('../src/SeatsioClient.js');
const axios = require('axios');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const LabelClasses = require('../src/Common/Labels.js');

module.exports = {
    'baseUrl': 'https://api-staging.seatsio.net/',

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

    getChartKey: function () {
        return uuidv1();
    },

    createClient: function (key, baseUrl) {
        return new SeatsioClient(key, baseUrl);
    },

    createTestChart: async function (chartKey, designerKey) {
        await this.createTestChartFromFile('/sampleChart.json', chartKey, designerKey);
    },

    createTestChartWithTables: async function (chartKey, designerKey) {
        await this.createTestChartFromFile('/sampleChartWithTables.json', chartKey, designerKey);
    },

    createTestChartWithSections: async function (chartKey, designerKey) {
        await this.createTestChartFromFile('/sampleChartWithSections.json', chartKey, designerKey);
    },

    createTestChartFromFile: function (filePath, chartKey, designerKey) {
        var requestBody = fs.readFileSync(__dirname + filePath, 'utf-8');
        var client = axios.create();
        var url = `https://api-staging.seatsio.net/system/public/${designerKey}/charts/${chartKey}`;
        return client.post(url, requestBody).catch((err) => console.log(err));
    },

    someLabels(ownLabel, ownType, parentLabel = null, parentType = null, section = null, entrance = null) {
        let labels;
        if (parentLabel) {
            labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(ownLabel, ownType), new LabelClasses.LabelAndType(parentLabel, parentType));
        } else {
            labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(ownLabel, ownType));
        }
        if (section) {
            labels.section = section;
        }
        if (entrance) {
            labels.entrance = {}
            labels.entrance.label = entrance;
        }
        return labels;
    },

    getRandomEmail() {
        return uuidv1() + '@mailinator.com';
    }
};
