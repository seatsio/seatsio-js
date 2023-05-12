import { Lister } from '../Lister'
import { Page } from '../Page'
import { Chart } from './Chart'

export class Charts {
    archive: any
    client: any

    constructor (client: any) {
        this.client = client
        this.archive = new Lister('/charts/archive', this.client, 'charts', (data: any) => {
            const charts = data.items.map((chartData: any) => new Chart(chartData))
            return new Page(charts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    create (name = null, venueType = null, categories = null) {
        const requestParameters = {}

        if (name !== null) {
            // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
            requestParameters.name = name
        }

        if (venueType !== null) {
            // @ts-expect-error TS(2339): Property 'venueType' does not exist on type '{}'.
            requestParameters.venueType = venueType
        }

        if (categories !== null) {
            // @ts-expect-error TS(2339): Property 'categories' does not exist on type '{}'.
            requestParameters.categories = categories
        }

        return this.client.post('charts', requestParameters)
            .then((res: any) => new Chart(res.data))
    }

    update (key: any, name = null, categories = null) {
        const requestParameters = {}

        if (name !== null) {
            // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
            requestParameters.name = name
        }

        if (categories !== null) {
            // @ts-expect-error TS(2339): Property 'categories' does not exist on type '{}'.
            requestParameters.categories = categories
        }

        return this.client.post(`/charts/${key}`, requestParameters)
    }

    addCategory (key: any, category: any) {
        return this.client.post(`/charts/${key}/categories`, category)
    }

    removeCategory (chartKey: any, categoryKey: any) {
        return this.client.delete(`/charts/${chartKey}/categories/${categoryKey}`)
    }

    listCategories (key: any) {
        return this.client.get(`/charts/${key}/categories`)
            .then((res: any) => res.data.categories)
    }

    validatePublishedVersion (key: any) {
        return this.client.post(`/charts/${key}/version/published/actions/validate`)
            .then((res: any) => res.data)
    }

    validateDraftVersion (key: any) {
        return this.client.post(`/charts/${key}/version/draft/actions/validate`)
            .then((res: any) => res.data)
    }

    retrieve (key: any) {
        return this.client.get(`charts/${key}`)
            .then((res: any) => new Chart(res.data))
    }

    retrieveWithEvents (key: any) {
        return this.client.get(`charts/${key}?expand=events`)
            .then((res: any) => new Chart(res.data))
    }

    retrievePublishedVersion (key: any) {
        return this.client.get(`charts/${key}/version/published`)
            .then((res: any) => res.data)
    }

    retrieveDraftVersion (key: any) {
        return this.client.get(`charts/${key}/version/draft`)
            .then((res: any) => res.data)
    }

    publishDraftVersion (key: any) {
        return this.client.post(`charts/${key}/version/draft/actions/publish`)
    }

    discardDraftVersion (key: any) {
        return this.client.post(`/charts/${key}/version/draft/actions/discard`)
    }

    moveToArchive (key: any) {
        return this.client.post(`charts/${key}/actions/move-to-archive`)
    }

    moveOutOfArchive (key: any) {
        return this.client.post(`charts/${key}/actions/move-out-of-archive`)
    }

    copy (key: any) {
        return this.client.post(`charts/${key}/version/published/actions/copy`)
            .then((res: any) => new Chart(res.data))
    }

    copyDraftVersion (key: any) {
        return this.client.post(`charts/${key}/version/draft/actions/copy`)
            .then((res: any) => new Chart(res.data))
    }

    copyToSubaccount (key: any, subaccountId: any) {
        return this.client.post(`charts/${key}/version/published/actions/copy-to/${subaccountId}`)
            .then((res: any) => new Chart(res.data))
    }

    copyToWorkspace (key: any, workspaceKey: any) {
        return this.client.post(`charts/${key}/version/published/actions/copy-to-workspace/${workspaceKey}`)
            .then((res: any) => new Chart(res.data))
    }

    saveSocialDistancingRulesets (key: any, socialDistancingRulesets: any) {
        return this.client.post(`/charts/${key}/social-distancing-rulesets`, { socialDistancingRulesets })
    }

    retrievePublishedVersionThumbnail (key: any) {
        return this.client.get(`/charts/${key}/version/published/thumbnail`, { responseType: 'arraybuffer' })
            .then((res: any) => res.data)
    }

    retrieveDraftVersionThumbnail (key: any) {
        return this.client.get(`/charts/${key}/version/draft/thumbnail`, { responseType: 'arraybuffer' })
            .then((res: any) => res.data)
    }

    listAllTags () {
        return this.client.get('/charts/tags')
            .then((res: any) => res.data.tags)
    }

    addTag (key: any, tag: any) {
        const url = `charts/${key}/tags/${encodeURIComponent(tag)}`
        return this.client.post(url)
    }

    removeTag (key: any, tag: any) {
        const url = `charts/${key}/tags/${encodeURIComponent(tag)}`
        return this.client.delete(url)
    }

    listAll (requestParameters = {}) {
        return this.iterator().all(requestParameters)
    }

    listFirstPage (chartListParams = null, pageSize = null) {
        return this.iterator().firstPage(chartListParams, pageSize)
    }

    listPageAfter (afterId: any, chartListParameters = null, pageSize = null) {
        return this.iterator().pageAfter(afterId, chartListParameters, pageSize)
    }

    listPageBefore (beforeId: any, chartListParameters = null, pageSize = null) {
        return this.iterator().pageBefore(beforeId, chartListParameters, pageSize)
    }

    iterator () {
        return new Lister('/charts', this.client, 'charts', (data: any) => {
            const charts = data.items.map((chartData: any) => new Chart(chartData))
            return new Page(charts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
