const Page = require('../Page.js')
const Lister = require('../Lister.js')
const Workspace = require('./Workspace.js')

class Workspaces {
    /**
     * @param {SeatsioClient} client
     */
    constructor (client) {
        this.client = client
    }

    /**
     * @param {string} name
     * @param {boolean} isTest
     * @returns {Promise<Workspace>} Promise object that will resolve to a Workspace object
     */
    create (name, isTest = false) {
        const requestParameters = { name, isTest }

        return this.client.post('/workspaces', requestParameters)
            .then((res) => new Workspace(res.data))
    }

    /**
     * @param {string} key
     * @param {string} name
     */
    update (key, name) {
        const requestParameters = { name }

        return this.client.post(`/workspaces/${key}`, requestParameters)
    }

    /**
     * @param {string} key
     * @returns {Promise<Workspace>} Promise object that will resolve to a Workspace object
     */
    retrieve (key) {
        return this.client.get(`/workspaces/${key}`).then((res) => new Workspace(res.data))
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
        return new Lister('/workspaces', this.client, 'workspaces', (data) => {
            const workspaces = data.items.map((json) => new Workspace(json))
            return new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}

module.exports = Workspaces
