import { Account } from './Account.js'
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

    /**
     * @deprecated use addSecretKey() and removeSecretKey() instead
     */
    regenerateSecretKey () {
        return this.client.post(baseUrl + '/secret-key/actions/regenerate').then(res => res.data.secretKey)
    }

    addSecretKey () {
        return this.client.post(baseUrl + '/secret-key/actions/add').then(res => res.data.secretKey)
    }

    removeSecretKey (secretKeyToRemove: string) {
        return this.client.post(baseUrl + '/secret-key/actions/remove', { secretKey: secretKeyToRemove })
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
