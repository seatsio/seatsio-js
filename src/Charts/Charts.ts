import { Lister } from '../Lister'
import { Page } from '../Page'
import { Chart, ChartJson } from './Chart'
import { Axios } from 'axios'
import { ChartListParams } from './ChartListParams'
import { Category, CategoryJson, CategoryKey } from './Category'
import { CategoryUpdateParams } from './CategoryUpdateParams'

export class Charts {
    archive: Lister<Chart, ChartJson>
    client: Axios

    constructor (client: Axios) {
        this.client = client
        this.archive = new Lister<Chart, ChartJson>('/charts/archive', this.client, 'charts', data => {
            const charts = data.items.map((chartData: ChartJson) => new Chart(chartData))
            return new Page(charts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    create (name: string | null = null, venueType: string | null = null, categories: CategoryJson[] | null = null) {
        const requestParameters: any = {}

        if (name !== null) {
            requestParameters.name = name
        }

        if (venueType !== null) {
            requestParameters.venueType = venueType
        }

        if (categories !== null) {
            requestParameters.categories = categories
        }

        return this.client.post('charts', requestParameters)
            .then(res => new Chart(res.data))
    }

    update (key: string, name: string | null = null, categories: CategoryJson[] | null = null) {
        const requestParameters: any = {}

        if (name !== null) {
            requestParameters.name = name
        }

        if (categories !== null) {
            requestParameters.categories = categories
        }

        return this.client.post(`/charts/${key}`, requestParameters)
    }

    addCategory (key: string, category: CategoryJson) {
        return this.client.post(`/charts/${key}/categories`, category)
    }

    removeCategory (chartKey: string, categoryKey: CategoryKey) {
        return this.client.delete(`/charts/${chartKey}/categories/${categoryKey}`)
    }

    listCategories (key: string) {
        return this.client.get(`/charts/${key}/categories`)
            .then(res => res.data.categories)
            .then(categories => categories.map(function (category: Category) {
                if (category.accessible === undefined) {
                    category.accessible = false
                }
                return category
            }))
    }

    updateCategory (chartKey: string, categoryKey: CategoryKey, params: CategoryUpdateParams) {
        return this.client.post(`/charts/${chartKey}/categories/${categoryKey}`, params)
    }

    validatePublishedVersion (key: string) {
        return this.client.post(`/charts/${key}/version/published/actions/validate`)
            .then(res => res.data)
    }

    validateDraftVersion (key: string) {
        return this.client.post(`/charts/${key}/version/draft/actions/validate`)
            .then(res => res.data)
    }

    retrieve (key: string) {
        return this.client.get(`charts/${key}`)
            .then(res => new Chart(res.data))
    }

    retrieveWithEvents (key: string) {
        return this.client.get(`charts/${key}?expand=events`)
            .then(res => new Chart(res.data))
    }

    retrievePublishedVersion (key: string) {
        return this.client.get(`charts/${key}/version/published`)
            .then(res => res.data)
    }

    retrieveDraftVersion (key: string) {
        return this.client.get(`charts/${key}/version/draft`)
            .then(res => res.data)
    }

    publishDraftVersion (key: string) {
        return this.client.post(`charts/${key}/version/draft/actions/publish`)
    }

    discardDraftVersion (key: string) {
        return this.client.post(`/charts/${key}/version/draft/actions/discard`)
    }

    moveToArchive (key: string) {
        return this.client.post(`charts/${key}/actions/move-to-archive`)
    }

    moveOutOfArchive (key: string) {
        return this.client.post(`charts/${key}/actions/move-out-of-archive`)
    }

    copy (key: string) {
        return this.client.post(`charts/${key}/version/published/actions/copy`)
            .then(res => new Chart(res.data))
    }

    copyDraftVersion (key: string) {
        return this.client.post(`charts/${key}/version/draft/actions/copy`)
            .then(res => new Chart(res.data))
    }

    copyToWorkspace (key: string, workspaceKey: string) {
        return this.client.post(`charts/${key}/version/published/actions/copy-to-workspace/${workspaceKey}`)
            .then(res => new Chart(res.data))
    }

    copyFromWorkspaceTo (key: string, fromWorkspaceKey: string, toWorkspaceKey: string) {
        return this.client.post(`charts/${key}/version/published/actions/copy/from/${fromWorkspaceKey}/to/${toWorkspaceKey}`)
            .then(res => new Chart(res.data))
    }

    retrievePublishedVersionThumbnail (key: string) {
        return this.client.get(`/charts/${key}/version/published/thumbnail`, { responseType: 'arraybuffer' })
            .then(res => res.data)
    }

    retrieveDraftVersionThumbnail (key: string) {
        return this.client.get(`/charts/${key}/version/draft/thumbnail`, { responseType: 'arraybuffer' })
            .then(res => res.data)
    }

    listAllTags () {
        return this.client.get('/charts/tags')
            .then(res => res.data.tags)
    }

    addTag (key: string, tag: string) {
        const url = `charts/${key}/tags/${encodeURIComponent(tag)}`
        return this.client.post(url)
    }

    removeTag (key: string, tag: string) {
        const url = `charts/${key}/tags/${encodeURIComponent(tag)}`
        return this.client.delete(url)
    }

    listAll (chartListParams: ChartListParams | null = null) {
        return this.iterator().all(chartListParams)
    }

    listFirstPage (chartListParams: ChartListParams | null = null, pageSize: number | null = null) {
        return this.iterator().firstPage(chartListParams, pageSize)
    }

    listPageAfter (afterId: number, chartListParams: ChartListParams | null = null, pageSize: number | null = null) {
        return this.iterator().pageAfter(afterId, chartListParams, pageSize)
    }

    listPageBefore (beforeId: number, chartListParams: ChartListParams | null = null, pageSize: number | null = null) {
        return this.iterator().pageBefore(beforeId, chartListParams, pageSize)
    }

    iterator () {
        return new Lister<Chart, ChartJson>('/charts', this.client, 'charts', data => {
            const charts = data.items.map(chartData => new Chart(chartData))
            return new Page(charts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
