const Page = require('../Page.js')
const Lister = require('../Lister.js')
const Subaccount = require('./Subaccount.js')
const Chart = require('../Charts/Chart.js')

class Subaccounts {
    /**
     * @param {Axios} client
     */
    constructor (client) {
        this.client = client
        this.active = new Lister('/subaccounts/active', this.client, 'subaccounts', (data) => {
            const subaccounts = data.items.map((subaccountsData) => new Subaccount(subaccountsData))
            return new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before)
        })
        this.inactive = new Lister('/subaccounts/inactive', this.client, 'subaccounts', (data) => {
            const subaccounts = data.items.map((subaccountsData) => new Subaccount(subaccountsData))
            return new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    /**
     * @param {string} id
     * @returns {Promise<Subaccount>} Promise object that will resolve to a Subaccount object
     */
    retrieve (id) {
        return this.client.get(`/subaccounts/${id}`).then((res) => new Subaccount(res.data))
    }

    /**
     * @param {?string} name
     * @returns {Promise<Subaccount>} Promise object that will resolve to a Subaccount object
     */
    create (name = null) {
        const requestParameters = {}

        if (name !== null) {
            requestParameters.name = name
        }

        return this.client.post('/subaccounts', requestParameters)
            .then((res) => new Subaccount(res.data))
    }

    /**
     * @param {string} id
     * @param {?string} name
     * @returns {Promise}
     */
    update (id, name = null) {
        const requestParameters = {}

        if (name !== null) {
            requestParameters.name = name
        }

        return this.client.post(`/subaccounts/${id}`, requestParameters)
    }

    activate (id) {
        return this.client.post(`/subaccounts/${id}/actions/activate`)
    }

    deactivate (id) {
        return this.client.post(`/subaccounts/${id}/actions/deactivate`)
    }

    /**
     * @param {string} id
     * @returns {Promise<string>} Promise object that will resolve to a string
     */
    regenerateSecretKey (id) {
        return this.client.post(`/subaccounts/${id}/secret-key/actions/regenerate`).then((res) => res.data)
    }

    /**
     * @param {string} id
     * @returns {Promise<string>} Promise object that will resolve to a string
     */
    regenerateDesignerKey (id) {
        return this.client.post(`/subaccounts/${id}/designer-key/actions/regenerate`).then((res) => res.data)
    }

    /**
     * @param {string} id
     * @param {string} chartKey
     * @returns {Promise<Chart>} Promise object that will resolve to a Chart object
     */
    copyChartToParent (id, chartKey) {
        return this.client.post(`/subaccounts/${id}/charts/${chartKey}/actions/copy-to/parent`)
            .then((res) => new Chart(res.data))
    }

    /**
     * @param {string} fromId
     * @param {string} toId
     * @param {string} chartKey
     * @returns {Promise<Chart>} Promise object that will resolve to a Chart object
     */
    copyChartToSubaccount (fromId, toId, chartKey) {
        return this.client.post(`/subaccounts/${fromId}/charts/${chartKey}/actions/copy-to/${toId}`)
            .then((res) => new Chart(res.data))
    }

    /**
     * @returns {AsyncIterator}
     */
    listAll (filter = null) {
        const requestParameters = filter !== null ? { filter: filter } : {}
        return this.iterator().all(requestParameters)
    }

    /**
     * @returns {Page}
     */
    listFirstPage (filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter: filter } : null
        return this.iterator().firstPage(requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listPageAfter (afterId, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter: filter } : null
        return this.iterator().pageAfter(afterId, requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listPageBefore (beforeId, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter: filter } : null
        return this.iterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    /**
     * @returns {Lister}
     */
    iterator () {
        return new Lister('/subaccounts', this.client, 'subaccounts', (data) => {
            const subaccounts = data.items.map((subaccountsData) => new Subaccount(subaccountsData))
            return new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}

module.exports = Subaccounts
