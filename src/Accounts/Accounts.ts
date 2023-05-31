import { Account } from './Account'
import { Axios } from 'axios'

const baseUrl = '/accounts/me'

export class Accounts {
    private client: Axios

    constructor (client: Axios) {
        this.client = client
    }

    retrieveMyAccount () {
        return this.client.get(baseUrl).then(res => new Account(res.data))
    }

    regenerateSecretKey () {
        return this.client.post(baseUrl + '/secret-key/actions/regenerate').then(res => res.data.secretKey)
    }

    regenerateDesignerKey () {
        return this.client.post(baseUrl + '/designer-key/actions/regenerate').then(res => res.data.designerKey)
    }

    enableDraftChartDrawings () {
        return this.client.post(baseUrl + '/draft-chart-drawings/actions/enable')
    }

    disableDraftChartDrawings () {
        return this.client.post(baseUrl + '/draft-chart-drawings/actions/disable')
    }

    changePassword (password: string) {
        return this.client.post(baseUrl + '/actions/change-password', { password })
    }

    changeHoldPeriod (holdPeriodInMinutes: number) {
        return this.client.post(baseUrl + '/actions/change-hold-period', { holdPeriodInMinutes })
    }

    updateSetting (key: string, value: string) {
        return this.client.post(baseUrl + '/settings', { key, value })
    }
}
