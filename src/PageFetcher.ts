import { Page } from './Page'

export class PageFetcher {
    private readonly client: any
    private readonly pageCreator: (data: any) => Page
    private readonly url: string

    constructor (url: string, client: any, pageCreatorFunction: (data: any) => Page) {
        this.url = url
        this.client = client
        this.pageCreator = pageCreatorFunction
    }

    fetchAfter (afterId: any, queryParameters: any, pageSize: any) {
        const parameters = queryParameters || {}

        if (afterId !== null) {
            parameters.start_after_id = afterId
        }
        return this.fetch(parameters, pageSize)
    }

    fetchBefore (beforeId: any, queryParameters: any, pageSize: any) {
        const parameters = queryParameters || {}

        if (beforeId) {
            parameters.end_before_id = beforeId
        }

        return this.fetch(parameters, pageSize)
    }

    private async fetch (queryParameters: any, pageSize: any) {
        const parameters = queryParameters || {}

        if (pageSize) {
            parameters.limit = pageSize
        }

        const res = await this.client.get(this.url, { params: parameters }).then((res: any) => res.data)
        return this.pageCreator(res)
    }
}
