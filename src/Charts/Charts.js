const Page = require('../Page.js')
const Lister = require('../Lister.js')
const Chart = require('./Chart.js')

class Charts {
    /**
     * @param {Axios} client
     */
    constructor (client) {
        this.client = client
        this.archive = new Lister('/charts/archive', this.client, 'charts', (data) => {
            const charts = data.items.map((chartData) => new Chart(chartData))
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
            requestParameters.name = name
        }

        if (venueType !== null) {
            requestParameters.venueType = venueType
        }

        if (categories !== null) {
            requestParameters.categories = categories
        }

        return this.client.post('charts', requestParameters)
            .then((res) => new Chart(res.data))
    }

    /**
     * @param {string} key
     * @param {?string} name
     * @param {Object[]} categories
     * @returns {Promise}
     */
    update (key, name = null, categories = null) {
        const requestParameters = {}

        if (name !== null) {
            requestParameters.name = name
        }

        if (categories !== null) {
            requestParameters.categories = categories
        }

        return this.client.post(`/charts/${key}`, requestParameters)
    }

    addCategory (key, category) {
        return this.client.post(`/charts/${key}/categories`, category)
    }

    removeCategory (chartKey, categoryKey) {
        return this.client.delete(`/charts/${chartKey}/categories/${categoryKey}`)
    }

    /**
     * @param {string} key
     * @returns {object}
     */
    validatePublishedVersion (key) {
        return this.client.post(`/charts/${key}/version/published/actions/validate`)
            .then(res => res.data)
    }

    /**
     * @param {string} key
     * @returns {object}
     */
    validateDraftVersion (key) {
        return this.client.post(`/charts/${key}/version/draft/actions/validate`)
            .then(res => res.data)
    }

    /**
     * @param {string} key
     * @returns {Promise<Chart>}
     */
    retrieve (key) {
        return this.client.get(`charts/${key}`)
            .then((res) => new Chart(res.data))
    }

    /**
     * @param {string} key
     * @returns {Promise<Chart>}
     */
    retrieveWithEvents (key) {
        return this.client.get(`charts/${key}?expand=events`)
            .then((res) => new Chart(res.data))
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    retrievePublishedVersion (key) {
        return this.client.get(`charts/${key}/version/published`)
            .then((res) => res.data)
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    retrieveDraftVersion (key) {
        return this.client.get(`charts/${key}/version/draft`)
            .then((res) => res.data)
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    publishDraftVersion (key) {
        return this.client.post(`charts/${key}/version/draft/actions/publish`)
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    discardDraftVersion (key) {
        return this.client.post(`/charts/${key}/version/draft/actions/discard`)
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    moveToArchive (key) {
        return this.client.post(`charts/${key}/actions/move-to-archive`)
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    moveOutOfArchive (key) {
        return this.client.post(`charts/${key}/actions/move-out-of-archive`)
    }

    /**
     * @param {string} key
     * @returns {Promise<Chart>}
     */
    copy (key) {
        return this.client.post(`charts/${key}/version/published/actions/copy`)
            .then((res) => new Chart(res.data))
    }

    /**
     * @param {string} key
     * @returns {Promise<Chart>}
     */
    copyDraftVersion (key) {
        return this.client.post(`charts/${key}/version/draft/actions/copy`)
            .then((res) => new Chart(res.data))
    }

    /**
     * @param {string} key
     * @returns {Promise<Chart>}
     */
    copyToSubaccount (key, subaccountId) {
        return this.client.post(`charts/${key}/version/published/actions/copy-to/${subaccountId}`)
            .then((res) => new Chart(res.data))
    }

    /**
     * @param {string} key
     * @params {string} workspaceKey
     * @returns {Promise<Chart>}
     */
    copyToWorkspace (key, workspaceKey) {
        return this.client.post(`charts/${key}/version/published/actions/copy-to-workspace/${workspaceKey}`)
            .then((res) => new Chart(res.data))
    }

    /**
     * @param {string} key
     * @param {object} socialDistancingRulesets
     */
    saveSocialDistancingRulesets (key, socialDistancingRulesets) {
        return this.client.post(`/charts/${key}/social-distancing-rulesets`, { socialDistancingRulesets })
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    retrievePublishedVersionThumbnail (key) {
        return this.client.get(`/charts/${key}/version/published/thumbnail`, { responseType: 'arraybuffer' })
            .then((res) => res.data)
    }

    /**
     * @param {string} key
     * @returns {Promise}
     */
    retrieveDraftVersionThumbnail (key) {
        return this.client.get(`/charts/${key}/version/draft/thumbnail`, { responseType: 'arraybuffer' })
            .then((res) => res.data)
    }

    /**
     * @returns {string[]}
     */
    listAllTags () {
        return this.client.get('/charts/tags')
            .then((res) => res.data.tags)
    }

    /**
     * @param {string} key
     * @param {string} tag
     * @returns {Promise}
     */
    addTag (key, tag) {
        const url = `charts/${key}/tags/${encodeURIComponent(tag)}`
        return this.client.post(url)
    }

    /**
     * @param {string} key
     * @param {string} tag
     * @returns {Promise}
     */
    removeTag (key, tag) {
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
    listPageAfter (afterId, chartListParameters = null, pageSize = null) {
        return this.iterator().pageAfter(afterId, chartListParameters, pageSize)
    }

    /**
     * @param {string} beforeId
     * @param {?ChartListParams} chartListParameters
     * @param {?number} pageSize
     * @returns {Page}
     */
    listPageBefore (beforeId, chartListParameters = null, pageSize = null) {
        return this.iterator().pageBefore(beforeId, chartListParameters, pageSize)
    }

    /**
     * @returns {Lister}
     */
    iterator () {
        return new Lister('/charts', this.client, 'charts', (data) => {
            const charts = data.items.map((chartData) => new Chart(chartData))
            return new Page(charts, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}

module.exports = Charts
