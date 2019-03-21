const AsyncIterator = require('./AsyncIterator.js')
const PageFetcher = require('./PageFetcher.js')

class Lister {
  constructor (url, client, type, pageCreatorFunction) {
    this.pageFetcher = new PageFetcher(url, client, pageCreatorFunction)
    this.url = url
    this.client = client
    this.type = type
  }

  all (parameters = {}) {
    let params = parameters.serialize ? parameters.serialize() : parameters
    return new AsyncIterator(this.url, this.client, this.type, params)
  }

  firstPage (queryParams = null, pageSize = null) {
    let params = queryParams ? queryParams.serialize() : null
    return this.pageFetcher.fetchAfter(null, params, pageSize)
  }

  pageAfter (afterId, queryParams = null, pageSize = null) {
    let params = queryParams ? queryParams.serialize() : null
    return this.pageFetcher.fetchAfter(afterId, params, pageSize)
  }

  pageBefore (beforeId, queryParams = null, pageSize = null) {
    let params = queryParams ? queryParams.serialize() : null
    return this.pageFetcher.fetchBefore(beforeId, params, pageSize)
  }
}

module.exports = Lister
