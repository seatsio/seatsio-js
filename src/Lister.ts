import { PageFetcher } from './PageFetcher'
import { AsyncIterator, PaginatedJson } from './AsyncIterator'
import { Axios } from 'axios'
import { Page } from './Page'

export class Lister<T, Y> {
    client: Axios
    pageFetcher: PageFetcher<T, Y>
    url: string
    constructor (url: string, client: Axios, pageCreatorFunction: (data: PaginatedJson<Y>) => Page<T>) {
        this.pageFetcher = new PageFetcher<T, Y>(url, client, pageCreatorFunction)
        this.url = url
        this.client = client
    }

    all (queryParams: object | null = null) {
        return new AsyncIterator<T, Y>(this.url, this.client, this.pageFetcher.pageCreator, Lister.serialize(queryParams) || {})
    }

    firstPage (queryParams: object | null = null, pageSize: number | null = null) {
        return this.pageFetcher.fetchAfter(null, Lister.serialize(queryParams), pageSize)
    }

    pageAfter (afterId: number, queryParams: object | null = null, pageSize: number | null = null) {
        return this.pageFetcher.fetchAfter(afterId, Lister.serialize(queryParams), pageSize)
    }

    pageBefore (beforeId: number, queryParams: object | null = null, pageSize: number | null = null) {
        return this.pageFetcher.fetchBefore(beforeId, Lister.serialize(queryParams), pageSize)
    }

    private static serialize (queryParams: object | null) {
        // @ts-ignore
        if (queryParams?.serialize) {
            // @ts-ignore
            return queryParams.serialize()
        }
        return queryParams
    }
}
