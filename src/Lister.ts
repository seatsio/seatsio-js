import { PageFetcher } from './PageFetcher'
import { AsyncIterator } from './AsyncIterator'
import { Page } from './Page'

export class Lister {
    private readonly url: string
    private readonly client: any
    private readonly type: string
    private readonly pageFetcher: PageFetcher

    constructor (url: string, client: any, type: string, pageCreatorFunction: (data: any) => Page) {
        this.pageFetcher = new PageFetcher(url, client, pageCreatorFunction)
        this.url = url
        this.client = client
        this.type = type
    }

    all (parameters = {}) {
        // @ts-expect-error TS(2339): Property 'serialize' does not exist on type '{}'.
        const params = parameters.serialize ? parameters.serialize() : parameters
        return new AsyncIterator(this.url, this.client, this.type, params)
    }

    firstPage (queryParams: any = null, pageSize = null) {
        const params = queryParams && queryParams.serialize ? queryParams.serialize() : queryParams
        return this.pageFetcher.fetchAfter(null, params, pageSize)
    }

    pageAfter (afterId: any, queryParams: any = null, pageSize = null) {
        const params = queryParams && queryParams.serialize ? queryParams.serialize() : queryParams
        return this.pageFetcher.fetchAfter(afterId, params, pageSize)
    }

    pageBefore (beforeId: any, queryParams: any = null, pageSize = null) {
        const params = queryParams && queryParams.serialize ? queryParams.serialize() : queryParams
        return this.pageFetcher.fetchBefore(beforeId, params, pageSize)
    }
}
