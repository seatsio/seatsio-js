const ChartPagedIterator = require('./ChartPagedIterator.js');

class FilterableChartLister{
  constructor(pageFetcher){
    this.pageFetcher = pageFetcher;
  }

  firstPage(queryParams, pageSize = null){
    return this.pageFetcher.fetchAfter(null, queryParams, pageSize);
  }

  pageAfter(afterId, queryParams, pageSize = null){
    return this.pageFetcher.fetchAfter(afterId, queryParams, pageSize);
  }

  pageBefore(beforeId, queryParams, pageSize = null){
    return this.pageFetcher.fetchBefore(beforeId, queryParams, pageSize);
  }
}

module.exports = FilterableChartLister;
