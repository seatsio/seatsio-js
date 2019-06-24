class PageFetcher {
    constructor (url, client, pageCreator) {
        this.url = url
        this.client = client
        this.pageCreator = pageCreator
    }

    fetchAfter (afterId, queryParameters, pageSize) {
        let parameters = queryParameters || {}

        if (afterId !== null) {
            parameters.start_after_id = afterId
        }
        return this.fetch(parameters, pageSize)
    }

    fetchBefore (beforeId, queryParameters, pageSize) {
        let parameters = queryParameters || {}

        if (beforeId) {
            parameters.end_before_id = beforeId
        }

        return this.fetch(parameters, pageSize)
    }

    async fetch (queryParameters, pageSize) {
        let parameters = queryParameters || {}

        if (pageSize) {
            parameters.limit = pageSize
        }

        let res = await this.client.get(this.url, { params: parameters }).then((res) => res.data)
        return this.pageCreator(res)
    }
}

module.exports = PageFetcher
