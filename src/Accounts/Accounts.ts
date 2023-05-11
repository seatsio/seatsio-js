import { Account } from './Account'

const baseUrl = '/accounts/me'

export class Accounts {
    client: any;
    constructor (client: any) {
        this.client = client
    }

    /**
     * @returns {Promise<Account>}
     */
    retrieveMyAccount () {
        return this.client.get(baseUrl).then((res: any) => new Account(res.data));
    }

    /**
     * @returns {Promise<string>}
     */
    regenerateSecretKey () {
        return this.client.post(baseUrl + '/secret-key/actions/regenerate').then((res: any) => res.data.secretKey);
    }

    /**
     * @returns {Promise<string>}
     */
    regenerateDesignerKey () {
        return this.client.post(baseUrl + '/designer-key/actions/regenerate').then((res: any) => res.data.designerKey);
    }

    /**
     * @returns {Promise}
     */
    enableDraftChartDrawings () {
        return this.client.post(baseUrl + '/draft-chart-drawings/actions/enable')
    }

    /**
     * @returns {Promise} Promise
     */
    disableDraftChartDrawings () {
        return this.client.post(baseUrl + '/draft-chart-drawings/actions/disable')
    }

    /**
     * @param {string} password
     * @returns {Promise} Promise
     */
    changePassword (password: any) {
        return this.client.post(baseUrl + '/actions/change-password', { password })
    }

    /**
     * @param {number} holdPeriodInMinutes
     * @returns {Promise} Promise
     */
    changeHoldPeriod (holdPeriodInMinutes: any) {
        return this.client.post(baseUrl + '/actions/change-hold-period', { holdPeriodInMinutes })
    }

    /**
     * @param {string} key
     * @param {string} value
     * @returns {Promise} Promise
     */
    updateSetting (key: any, value: any) {
        return this.client.post(baseUrl + '/settings', { key, value })
    }
}
