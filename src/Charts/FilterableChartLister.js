const ChartPagedIterator = require('./ChartPagedIterator.js');
const ChartPage = require('./ChartPage.js');

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
}

module.exports = FilterableChartLister;
