import { Page } from '../Page.js'
import { Lister } from '../Lister.js'
import { Subaccount } from './Subaccount.js'
import { Chart } from '../Charts/Chart.js'

export class Subaccounts {
    active: any
    client: any
    inactive: any
    /**
     * @param {Axios} client
     */
    constructor (client: any) {
        this.client = client
        this.active = new Lister('/subaccounts/active', this.client, 'subaccounts', (data: any) => {
            const subaccounts = data.items.map((subaccountsData: any) => new Subaccount(subaccountsData))
            return new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before)
        })
        this.inactive = new Lister('/subaccounts/inactive', this.client, 'subaccounts', (data: any) => {
            const subaccounts = data.items.map((subaccountsData: any) => new Subaccount(subaccountsData))
            return new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    /**
     * @param {string} id
     * @returns {Promise<Subaccount>} Promise object that will resolve to a Subaccount object
     */
    retrieve (id: any) {
        return this.client.get(`/subaccounts/${id}`).then((res: any) => new Subaccount(res.data))
    }

    /**
     * @param {?string} name
     * @returns {Promise<Subaccount>} Promise object that will resolve to a Subaccount object
     */
    create (name = null) {
        const requestParameters = {}

        if (name !== null) {
            // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
            requestParameters.name = name
        }

        return this.client.post('/subaccounts', requestParameters)
            .then((res: any) => new Subaccount(res.data))
    }

    /**
     * @param {string} id
     * @param {?string} name
     * @returns {Promise}
     */
    update (id: any, name = null) {
        const requestParameters = {}

        if (name !== null) {
            // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
            requestParameters.name = name
        }

        return this.client.post(`/subaccounts/${id}`, requestParameters)
    }

    activate (id: any) {
        return this.client.post(`/subaccounts/${id}/actions/activate`)
    }

    deactivate (id: any) {
        return this.client.post(`/subaccounts/${id}/actions/deactivate`)
    }

    /**
     * @param {string} id
     * @returns {Promise<string>} Promise object that will resolve to a string
     */
    regenerateSecretKey (id: any) {
        return this.client.post(`/subaccounts/${id}/secret-key/actions/regenerate`).then((res: any) => res.data)
    }

    /**
     * @param {string} id
     * @returns {Promise<string>} Promise object that will resolve to a string
     */
    regenerateDesignerKey (id: any) {
        return this.client.post(`/subaccounts/${id}/designer-key/actions/regenerate`).then((res: any) => res.data)
    }

    /**
     * @param {string} id
     * @param {string} chartKey
     * @returns {Promise<Chart>} Promise object that will resolve to a Chart object
     */
    copyChartToParent (id: any, chartKey: any) {
        return this.client.post(`/subaccounts/${id}/charts/${chartKey}/actions/copy-to/parent`)
            .then((res: any) => new Chart(res.data))
    }

    /**
     * @param {string} fromId
     * @param {string} toId
     * @param {string} chartKey
     * @returns {Promise<Chart>} Promise object that will resolve to a Chart object
     */
    copyChartToSubaccount (fromId: any, toId: any, chartKey: any) {
        return this.client.post(`/subaccounts/${fromId}/charts/${chartKey}/actions/copy-to/${toId}`)
            .then((res: any) => new Chart(res.data))
    }

    /**
     * @returns {AsyncIterator}
     */
    listAll (filter = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.iterator().all(requestParameters)
    }

    /**
     * @returns {Page}
     */
    listFirstPage (filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.iterator().firstPage(requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listPageAfter (afterId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.iterator().pageAfter(afterId, requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listPageBefore (beforeId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.iterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    /**
     * @returns {Lister}
     */
    iterator () {
        return new Lister('/subaccounts', this.client, 'subaccounts', (data: any) => {
            const subaccounts = data.items.map((subaccountsData: any) => new Subaccount(subaccountsData))
            return new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
