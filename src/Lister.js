const AsyncIterator = require('./AsyncIterator.js')
const PageFetcher = require('./PageFetcher.js')

class Lister {
  constructor (url, client, type, pageCreatorFunction) {
    this.pageFetcher = new PageFetcher(url, client, pageCreatorFunction)
    this.url = url
    this.client = client
    this.type = type
  }

  all (parameters) {
    return new AsyncIterator(this.url, this.client, this.type, parameters)
  }

  firstPage (queryParams = null, pageSize = null) {
    return this.pageFetcher.fetchAfter(null, queryParams, pageSize)
  }

  pageAfter (afterId, queryParams = null, pageSize = null) {
    return this.pageFetcher.fetchAfter(afterId, queryParams, pageSize)
  }

  pageBefore (beforeId, queryParams = null, pageSize = null) {
    return this.pageFetcher.fetchBefore(beforeId, queryParams, pageSize)
  }
}

module.exports = Lister
