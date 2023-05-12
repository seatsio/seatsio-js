export class PageFetcher {
    client: any
    pageCreator: any
    url: any
    constructor (url: any, client: any, pageCreator: any) {
        this.url = url
        this.client = client
        this.pageCreator = pageCreator
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

    async fetch (queryParameters: any, pageSize: any) {
        const parameters = queryParameters || {}

        if (pageSize) {
            parameters.limit = pageSize
        }

        const res = await this.client.get(this.url, { params: parameters }).then((res: any) => res.data)
        return this.pageCreator(res)
    }
}
