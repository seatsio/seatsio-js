const AsyncIterator = require('./AsyncIterator.js')
const PageFetcher = require('./PageFetcher.js')

class Lister {
    constructor (url, client, type, pageCreatorFunction) {
        this.pageFetcher = new PageFetcher(url, client, pageCreatorFunction)
        this.url = url
        this.client = client
        this.type = type
    }

    /**
     * @param {object} parameters
     * @returns {AsyncIterator}
     */
    all (parameters = {}) {
        const params = parameters.serialize ? parameters.serialize() : parameters
        return new AsyncIterator(this.url, this.client, this.type, params)
    }

    /**
     * @param {?object} queryParams
     * @param {?number} pageSize
     * @returns {Page}
     */
    firstPage (queryParams = null, pageSize = null) {
        const params = queryParams && queryParams.serialize ? queryParams.serialize() : queryParams
        return this.pageFetcher.fetchAfter(null, params, pageSize)
    }

    /**
     * @param {string} afterId
     * @param {?object} queryParams
     * @param {?number} pageSize
     * @returns {Page}
     */
    pageAfter (afterId, queryParams = null, pageSize = null) {
        const params = queryParams && queryParams.serialize ? queryParams.serialize() : queryParams
        return this.pageFetcher.fetchAfter(afterId, params, pageSize)
    }

    /**
     * @param {string} beforeId
     * @param {?object} queryParams
     * @param {?number} pageSize
     * @returns {Page}
     */
    pageBefore (beforeId, queryParams = null, pageSize = null) {
        const params = queryParams && queryParams.serialize ? queryParams.serialize() : queryParams
        return this.pageFetcher.fetchBefore(beforeId, params, pageSize)
    }
}

module.exports = Lister
