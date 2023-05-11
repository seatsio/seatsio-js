import { Account } from './Account'

const baseUrl = '/accounts/me'

export class Accounts {
    private client: any

    constructor (client: any) {
        this.client = client
    }

    retrieveMyAccount () {
        return this.client.get(baseUrl).then((res: any) => new Account(res.data))
    }

    regenerateSecretKey () {
        return this.client.post(baseUrl + '/secret-key/actions/regenerate').then((res: any) => res.data.secretKey)
    }

    regenerateDesignerKey () {
        return this.client.post(baseUrl + '/designer-key/actions/regenerate').then((res: any) => res.data.designerKey)
    }

    enableDraftChartDrawings () {
        return this.client.post(baseUrl + '/draft-chart-drawings/actions/enable')
    }

    disableDraftChartDrawings () {
        return this.client.post(baseUrl + '/draft-chart-drawings/actions/disable')
    }

    changePassword (password: any) {
        return this.client.post(baseUrl + '/actions/change-password', { password })
    }

    changeHoldPeriod (holdPeriodInMinutes: any) {
        return this.client.post(baseUrl + '/actions/change-hold-period', { holdPeriodInMinutes })
    }

    updateSetting (key: any, value: any) {
        return this.client.post(baseUrl + '/settings', { key, value })
    }
}
