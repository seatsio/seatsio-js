import { Axios } from 'axios'
import { Page } from './Page'
import { PaginatedJson } from './AsyncIterator'

export class PageFetcher<T, Y> {
    client: Axios
    pageCreator: (data: PaginatedJson<Y>) => Page<T>
    url: string

    constructor (url: string, client: Axios, pageCreator: (data: PaginatedJson<Y>) => Page<T>) {
        this.url = url
        this.client = client
        this.pageCreator = pageCreator
    }

    fetchAfter (afterId: number | null, queryParameters: object | null, pageSize: number | null) {
        const parameters = queryParameters || {}

        if (afterId !== null) {
            // @ts-ignore
            parameters.start_after_id = afterId
        }
        return this.fetch(parameters, pageSize)
    }

    fetchBefore (beforeId: number, queryParameters: object | null, pageSize: number | null) {
        const parameters = queryParameters || {}
        if (beforeId) {
            // @ts-ignore
            parameters.end_before_id = beforeId
        }

        return this.fetch(parameters, pageSize)
    }

    async fetch (queryParameters: object | null, pageSize: number | null) {
        const parameters = queryParameters || {}
        if (pageSize) {
            // @ts-ignore
            parameters.limit = pageSize
        }

        const res = await this.client.get(this.url, { params: parameters }).then(res => res.data)
        return this.pageCreator(res)
    }
}
