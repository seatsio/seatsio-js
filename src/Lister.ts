import { PageFetcher } from './PageFetcher'
import { AsyncIterator } from './AsyncIterator'

export class Lister {
    client: any
    pageFetcher: any
    type: any
    url: any
    constructor (url: any, client: any, type: any, pageCreatorFunction: any) {
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
        // @ts-expect-error TS(2339): Property 'serialize' does not exist on type '{}'.
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
    pageAfter (afterId: any, queryParams = null, pageSize = null) {
        const params = queryParams && queryParams.serialize ? queryParams.serialize() : queryParams
        return this.pageFetcher.fetchAfter(afterId, params, pageSize)
    }

    /**
     * @param {string} beforeId
     * @param {?object} queryParams
     * @param {?number} pageSize
     * @returns {Page}
     */
    pageBefore (beforeId: any, queryParams = null, pageSize = null) {
        const params = queryParams && queryParams.serialize ? queryParams.serialize() : queryParams
        return this.pageFetcher.fetchBefore(beforeId, params, pageSize)
    }
}
