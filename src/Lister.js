class Lister {
  constructor (pageFetcher) {
    this.pageFetcher = pageFetcher
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
