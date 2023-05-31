import { Lister } from '../Lister'
import { Subaccount, SubaccountJson } from './Subaccount'
import { Page } from '../Page'
import { Chart } from '../Charts/Chart'
import { Axios } from 'axios'
import { Dict } from '../Dict'

export class Subaccounts {
    active: Lister<Subaccount, SubaccountJson>
    client: Axios
    inactive: Lister<Subaccount, SubaccountJson>

    constructor (client: Axios) {
        this.client = client
        this.active = new Lister<Subaccount, SubaccountJson>('/subaccounts/active', this.client, 'subaccounts', data => {
            const subaccounts = data.items.map(subaccountsData => new Subaccount(subaccountsData))
            return new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before)
        })
        this.inactive = new Lister<Subaccount, SubaccountJson>('/subaccounts/inactive', this.client, 'subaccounts', data => {
            const subaccounts = data.items.map(subaccountsData => new Subaccount(subaccountsData))
            return new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    retrieve (id: number) {
        return this.client.get(`/subaccounts/${id}`).then(res => new Subaccount(res.data))
    }

    create (name: string | null = null) {
        const requestParameters: Dict<any> = {}

        if (name !== null) {
            requestParameters.name = name
        }

        return this.client.post('/subaccounts', requestParameters)
            .then(res => new Subaccount(res.data))
    }

    update (id: number, name: string | null = null) {
        const requestParameters: Dict<any> = {}

        if (name !== null) {
            requestParameters.name = name
        }

        return this.client.post(`/subaccounts/${id}`, requestParameters)
    }

    activate (id: number) {
        return this.client.post(`/subaccounts/${id}/actions/activate`)
    }

    deactivate (id: number) {
        return this.client.post(`/subaccounts/${id}/actions/deactivate`)
    }

    regenerateSecretKey (id: number) {
        return this.client.post(`/subaccounts/${id}/secret-key/actions/regenerate`).then(res => res.data)
    }

    regenerateDesignerKey (id: number) {
        return this.client.post(`/subaccounts/${id}/designer-key/actions/regenerate`).then(res => res.data)
    }

    copyChartToParent (id: number, chartKey: string) {
        return this.client.post(`/subaccounts/${id}/charts/${chartKey}/actions/copy-to/parent`)
            .then(res => new Chart(res.data))
    }

    copyChartToSubaccount (fromId: number, toId: number, chartKey: string) {
        return this.client.post(`/subaccounts/${fromId}/charts/${chartKey}/actions/copy-to/${toId}`)
            .then(res => new Chart(res.data))
    }

    listAll (filter: string | null = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.iterator().all(requestParameters)
    }

    listFirstPage (filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().firstPage(requestParameters, pageSize)
    }

    listPageAfter (afterId: number, filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().pageAfter(afterId, requestParameters, pageSize)
    }

    listPageBefore (beforeId: number, filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    iterator () {
        return new Lister<Subaccount, SubaccountJson>('/subaccounts', this.client, 'subaccounts', data => {
            const subaccounts = data.items.map(subaccountsData => new Subaccount(subaccountsData))
            return new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
