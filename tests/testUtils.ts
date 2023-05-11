import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Region, SeatsioClient } from '../index'
import * as fs from 'fs'
// @ts-ignore
import path from 'path'
import * as LabelClasses from '../src/Common/Labels'
import { Category } from '../src/Charts/Category'
import { fileURLToPath } from 'url'

const baseUrl = 'https://api-staging-eu.seatsio.net/'

export class TestUtils {
    static async createTestUserAndClient () {
        const company = await TestUtils.createTestCompany()
        const user = company.admin
        const subaccount = company.subaccount
        const workspace = company.workspace
        const client = this.createClient(user.secretKey)
        return { user, subaccount, workspace, client }
    }

    static createTestCompany () {
        return axios({
            method: 'POST',
            url: baseUrl + 'system/public/users/actions/create-test-company'
        }).then(response => {
            return response.data
        })
    }

    static getChartKey () {
        return uuidv4()
    }

    static createClient (secretKey, workspaceKey = null) {
        return new SeatsioClient(new Region(baseUrl), secretKey, workspaceKey)
    }

    static async createTestChart (chartKey, secretKey) {
        await this.createTestChartFromFile('/sampleChart.json', chartKey, secretKey)
    }

    static async createErroneousTestChart (chartKey, secretKey) {
        await this.createTestChartFromFile('/sampleChartWithErrors.json', chartKey, secretKey)
    }

    static async createTestChartWithTables (chartKey, secretKey) {
        await this.createTestChartFromFile('/sampleChartWithTables.json', chartKey, secretKey)
    }

    static async createTestChartWithSections (chartKey, secretKey) {
        await this.createTestChartFromFile('/sampleChartWithSections.json', chartKey, secretKey)
    }

    static async createTestChartFromFile (filePath, chartKey, secretKey) {
        const __dirname = fileURLToPath(new URL('.', import.meta.url))
        const requestBody = fs.readFileSync(path.join(__dirname, filePath), 'utf-8')
        const client = axios.create({
            auth: {
                username: secretKey,
                password: null
            }
        })
        const url = `${baseUrl}system/public/charts/${chartKey}`
        return client.post(url, requestBody)
    }

    static someLabels (ownLabel, ownType, parentLabel = null, parentType = null, section = null) {
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
    }

    static getRandomEmail () {
        return uuidv4() + '@mailinator.com'
    }

    static async createArray (length, fn) {
        const array = []

        for (let i = 0; i < length; ++i) {
            array.push(await fn())
        }

        return array
    }

    static deferred () {
        let res
        let rej

        const promise = new Promise((resolve, reject) => {
            res = resolve
            rej = reject
        })

        return {
            promise,
            reject: rej,
            resolve: res
        }
    }

    static async statusChangesPresent (client, eventKey, numStatusChanges) {
        const deferred = this.deferred()
        const start = new Date()

        const fetchStatusChanges = async () => {
            try {
                const statusChanges = await client.events.statusChanges(eventKey).firstPage()
                if (statusChanges.items.length === numStatusChanges) {
                    deferred.resolve(statusChanges.items)
                } else {
                    if (new Date().getTime() - start.getTime() > 10000) {
                        deferred.reject('No status changes for event ' + eventKey)
                    } else {
                        setTimeout(fetchStatusChanges, 1000)
                    }
                }
            } catch (e) {
                deferred.reject(e)
            }
        }
        fetchStatusChanges()

        return deferred.promise
    }

    static testChartCategories = [
        new Category(9, 'Cat1', '#87A9CD', false),
        new Category(10, 'Cat2', '#5E42ED', false),
        new Category('string11', 'Cat3', '#5E42BB', false)
    ]
}
