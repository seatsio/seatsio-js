import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import * as fs from 'fs'
import path from 'path'
import { Labels } from '../src/Common/Labels'
import { Category } from '../src/Charts/Category'
import { SeatsioClient } from '../src/SeatsioClient'
import { Region } from '../src/Region'
import { LabelAndType } from '../src/Common/LabelAndType'

const baseUrl = 'https://api-staging-eu.seatsio.net/'

export class TestUtils {
    static async createTestUserAndClient () {
        const company = await TestUtils.createTestCompany()
        const user = company.admin
        const workspace = company.workspace
        const client = this.createClient(user.secretKey)
        return { user, workspace, client }
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

    static createClient (secretKey: string, workspaceKey?: string) {
        return new SeatsioClient(new Region(baseUrl), secretKey, workspaceKey)
    }

    static async createTestChart (chartKey: string, secretKey: string) {
        await this.createTestChartFromFile('/sampleChart.json', chartKey, secretKey)
    }

    static async createErroneousTestChart (chartKey: string, secretKey: string) {
        await this.createTestChartFromFile('/sampleChartWithErrors.json', chartKey, secretKey)
    }

    static async createTestChartWithTables (chartKey: string, secretKey: string) {
        await this.createTestChartFromFile('/sampleChartWithTables.json', chartKey, secretKey)
    }

    static async createTestChartWithSections (chartKey: string, secretKey: string) {
        await this.createTestChartFromFile('/sampleChartWithSections.json', chartKey, secretKey)
    }

    static async createTestChartFromFile (filePath: string, chartKey: string, secretKey: string) {
        const requestBody = fs.readFileSync(path.join(__dirname, filePath), 'utf-8')
        const client = axios.create({
            auth: {
                username: secretKey,
                password: '' // TODO bver check this! Was null in js, is not nullable in ts
            }
        })
        const url = `${baseUrl}system/public/charts/${chartKey}`
        return client.post(url, requestBody)
    }

    static someLabels (ownLabel: string, ownType: string, parentLabel: string | null = null, parentType: string, section: string | null = null): Labels {
        let labels
        if (parentLabel) {
            labels = new Labels(new LabelAndType(ownLabel, ownType), new LabelAndType(parentLabel, parentType))
        } else {
            labels = new Labels(new LabelAndType(ownLabel, ownType))
        }
        if (section) {
            labels.setSection(section)
        }
        return labels
    }

    static getRandomEmail () {
        return uuidv4() + '@mailinator.com'
    }

    static async createArray (length: number, fn: Function) {
        const array = []

        for (let i = 0; i < length; ++i) {
            array.push(await fn())
        }

        return array
    }

    static deferred () {
        let res: Function
        let rej: Function

        const promise = new Promise((resolve: Function, reject: Function) => {
            res = resolve
            rej = reject
        })

        return {
            promise,
            reject: rej!,
            resolve: res!
        }
    }

    static async statusChangesPresent (client: SeatsioClient, eventKey: string, numStatusChanges: number) {
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
