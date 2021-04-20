const { SeatsioClient } = require('../index.js')
const axios = require('axios')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const LabelClasses = require('../src/Common/Labels.js')
const path = require('path')
const Region = require('../src/Region')

const baseUrl = 'https://api-staging-eu.seatsio.net/'

module.exports = {
    createTestUserAndClient: async function () {
        const company = await this.createTestCompany()
        const user = company.admin
        const subaccount = company.subaccount
        const workspace = company.workspace
        const client = this.createClient(user.secretKey)
        return { user, subaccount, workspace, client }
    },

    createTestCompany: function () {
        return axios({
            method: 'POST',
            url: baseUrl + 'system/public/users/actions/create-test-company'
        }).then(response => {
            return response.data
        })
    },

    getChartKey: function () {
        return uuidv4()
    },

    createClient: function (secretKey, workspaceKey = null) {
        return new SeatsioClient(new Region(baseUrl), secretKey, workspaceKey)
    },

    createTestChart: async function (chartKey, secretKey) {
        await this.createTestChartFromFile('/sampleChart.json', chartKey, secretKey)
    },

    createErroneousTestChart: async function (chartKey, secretKey) {
        await this.createTestChartFromFile('/sampleChartWithErrors.json', chartKey, secretKey)
    },

    createTestChartWithTables: async function (chartKey, secretKey) {
        await this.createTestChartFromFile('/sampleChartWithTables.json', chartKey, secretKey)
    },

    createTestChartWithSections: async function (chartKey, secretKey) {
        await this.createTestChartFromFile('/sampleChartWithSections.json', chartKey, secretKey)
    },

    createTestChartFromFile: function (filePath, chartKey, secretKey) {
        const requestBody = fs.readFileSync(path.join(__dirname, filePath), 'utf-8')
        const client = axios.create({
            auth: {
                username: secretKey,
                password: null
            }
        })
        const url = `${baseUrl}system/public/charts/${chartKey}`
        return client.post(url, requestBody)
    },

    someLabels (ownLabel, ownType, parentLabel = null, parentType = null, section = null) {
        let labels
        if (parentLabel) {
            labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(ownLabel, ownType), new LabelClasses.LabelAndType(parentLabel, parentType))
        } else {
            labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(ownLabel, ownType))
        }
        if (section) {
            labels.section = section
        }
        return labels
    },

    getRandomEmail () {
        return uuidv4() + '@mailinator.com'
    },

    createArray (length, fn) {
        const array = []

        for (let i = 0; i < length; ++i) {
            array.push(fn())
        }

        return Promise.all(array)
    },

    deferred () {
        let resolve
        let reject

        const promise = new Promise((res, rej) => {
            resolve = res
            reject = rej
        })

        return {
            promise,
            reject,
            resolve
        }
    }
}
