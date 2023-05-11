import { Lister } from '../Lister.js'
import { Chart } from './Chart.js'
import { Page } from '../Page.js'

export class Charts {
    archive: any;
    client: any;
    /**
     * @param {Axios} client
     */
    constructor (client: any) {
        this.client = client
        this.archive = new Lister('/charts/archive', this.client, 'charts', (data: any) => {
            const charts = data.items.map((chartData: any) => new Chart(chartData))
            return new Page(charts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    /* @return  Chart */
    /**
     * @param {?string} name
     * @param {?string} venueType
     * @param {?Object[]} categories
     * @returns {Promise<Chart>}
     */
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
            .then((res: any) => new Chart(res.data));
    }

    /**
     * @param {string} key
     * @param {?string} name
     * @param {Object[]} categories
     * @returns {Promise}
     */
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
            .then((res: any) => res.data.categories);
    }

    /**
     * @param {string} key
     * @returns {object}
     */
    validatePublishedVersion (key: any) {
        return this.client.post(`/charts/${key}/version/published/actions/validate`)
            .then((res: any) => res.data);
    }

    /**
     * @param {string} key
     * @returns {object}
     */
    validateDraftVersion (key: any) {
        return this.client.post(`/charts/${key}/version/draft/actions/validate`)
            .then((res: any) => res.data);
    }

    /**
     * @param {string} key
     * @returns {Promise<Chart>}
     */
    retrieve (key: any) {
        return this.client.get(`charts/${key}`)
            .then((res: any) => new Chart(res.data));
    }

    /**
     * @param {string} key
     * @returns {Promise<Chart>}
     */
    retrieveWithEvents (key: any) {
        return this.client.get(`charts/${key}?expand=events`)
            .then((res: any) => new Chart(res.data));
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    retrievePublishedVersion (key: any) {
        return this.client.get(`charts/${key}/version/published`)
            .then((res: any) => res.data);
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    retrieveDraftVersion (key: any) {
        return this.client.get(`charts/${key}/version/draft`)
            .then((res: any) => res.data);
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    publishDraftVersion (key: any) {
        return this.client.post(`charts/${key}/version/draft/actions/publish`)
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    discardDraftVersion (key: any) {
        return this.client.post(`/charts/${key}/version/draft/actions/discard`)
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    moveToArchive (key: any) {
        return this.client.post(`charts/${key}/actions/move-to-archive`)
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    moveOutOfArchive (key: any) {
        return this.client.post(`charts/${key}/actions/move-out-of-archive`)
    }

    /**
     * @param {string} key
     * @returns {Promise<Chart>}
     */
    copy (key: any) {
        return this.client.post(`charts/${key}/version/published/actions/copy`)
            .then((res: any) => new Chart(res.data));
    }

    /**
     * @param {string} key
     * @returns {Promise<Chart>}
     */
    copyDraftVersion (key: any) {
        return this.client.post(`charts/${key}/version/draft/actions/copy`)
            .then((res: any) => new Chart(res.data));
    }

    /**
     * @param {string} key
     * @returns {Promise<Chart>}
     */
    copyToSubaccount (key: any, subaccountId: any) {
        return this.client.post(`charts/${key}/version/published/actions/copy-to/${subaccountId}`)
            .then((res: any) => new Chart(res.data));
    }

    /**
     * @param {string} key
     * @params {string} workspaceKey
     * @returns {Promise<Chart>}
     */
    copyToWorkspace (key: any, workspaceKey: any) {
        return this.client.post(`charts/${key}/version/published/actions/copy-to-workspace/${workspaceKey}`)
            .then((res: any) => new Chart(res.data));
    }

    /**
     * @param {string} key
     * @param {object} socialDistancingRulesets
     */
    saveSocialDistancingRulesets (key: any, socialDistancingRulesets: any) {
        return this.client.post(`/charts/${key}/social-distancing-rulesets`, { socialDistancingRulesets })
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    retrievePublishedVersionThumbnail (key: any) {
        return this.client.get(`/charts/${key}/version/published/thumbnail`, { responseType: 'arraybuffer' })
            .then((res: any) => res.data);
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    retrieveDraftVersionThumbnail (key: any) {
        return this.client.get(`/charts/${key}/version/draft/thumbnail`, { responseType: 'arraybuffer' })
            .then((res: any) => res.data);
    }

    /**
     * @returns {string[]}
     */
    listAllTags () {
        return this.client.get('/charts/tags')
            .then((res: any) => res.data.tags);
    }

    /**
     * @param {string} key
     * @param {string} tag
     * @returns {Promise}
     */
    addTag (key: any, tag: any) {
        const url = `charts/${key}/tags/${encodeURIComponent(tag)}`
        return this.client.post(url)
    }

    /**
     * @param {string} key
     * @param {string} tag
     * @returns {Promise}
     */
    removeTag (key: any, tag: any) {
        const url = `charts/${key}/tags/${encodeURIComponent(tag)}`
        return this.client.delete(url)
    }

    /**
     * @param {object} requestParameters
     * @returns {AsyncIterator}
     */
    listAll (requestParameters = {}) {
        return this.iterator().all(requestParameters)
    }

    /**
     * @param {?ChartListParams} chartListParams
     * @param {?number} pageSize
     * @returns {Page}
     */
    listFirstPage (chartListParams = null, pageSize = null) {
        return this.iterator().firstPage(chartListParams, pageSize)
    }

    /**
     * @param {string} afterId
     * @param {?ChartListParams} chartListParameters
     * @param {?number} pageSize
     * @returns {Page}
     */
    listPageAfter (afterId: any, chartListParameters = null, pageSize = null) {
        return this.iterator().pageAfter(afterId, chartListParameters, pageSize)
    }

    /**
     * @param {string} beforeId
     * @param {?ChartListParams} chartListParameters
     * @param {?number} pageSize
     * @returns {Page}
     */
    listPageBefore (beforeId: any, chartListParameters = null, pageSize = null) {
        return this.iterator().pageBefore(beforeId, chartListParameters, pageSize)
    }

    /**
     * @returns {Lister}
     */
    iterator () {
        return new Lister('/charts', this.client, 'charts', (data: any) => {
            const charts = data.items.map((chartData: any) => new Chart(chartData))
            return new Page(charts, data.next_page_starts_after, data.previous_page_ends_before)
        });
    }
}
