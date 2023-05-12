import { Lister } from '../Lister'
import { Subaccount } from './Subaccount'
import { Page } from '../Page'
import { Chart } from '../Charts/Chart'

export class Subaccounts {
    active: any
    client: any
    inactive: any

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

    retrieve (id: any) {
        return this.client.get(`/subaccounts/${id}`).then((res: any) => new Subaccount(res.data))
    }

    create (name = null) {
        const requestParameters = {}

        if (name !== null) {
            // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
            requestParameters.name = name
        }

        return this.client.post('/subaccounts', requestParameters)
            .then((res: any) => new Subaccount(res.data))
    }

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

    regenerateSecretKey (id: any) {
        return this.client.post(`/subaccounts/${id}/secret-key/actions/regenerate`).then((res: any) => res.data)
    }

    regenerateDesignerKey (id: any) {
        return this.client.post(`/subaccounts/${id}/designer-key/actions/regenerate`).then((res: any) => res.data)
    }

    copyChartToParent (id: any, chartKey: any) {
        return this.client.post(`/subaccounts/${id}/charts/${chartKey}/actions/copy-to/parent`)
            .then((res: any) => new Chart(res.data))
    }

    copyChartToSubaccount (fromId: any, toId: any, chartKey: any) {
        return this.client.post(`/subaccounts/${fromId}/charts/${chartKey}/actions/copy-to/${toId}`)
            .then((res: any) => new Chart(res.data))
    }

    listAll (filter = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.iterator().all(requestParameters)
    }

    listFirstPage (filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().firstPage(requestParameters, pageSize)
    }

    listPageAfter (afterId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().pageAfter(afterId, requestParameters, pageSize)
    }

    listPageBefore (beforeId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    iterator () {
        return new Lister('/subaccounts', this.client, 'subaccounts', (data: any) => {
            const subaccounts = data.items.map((subaccountsData: any) => new Subaccount(subaccountsData))
            return new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
