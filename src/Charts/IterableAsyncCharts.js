const Chart = require('./Chart.js');

class IterableAsyncCharts{
  constructor(url, client, params = {}){
    this.items = [];
    this.index = 0;
    this.nextPageMustBeFetched = true;
    this.client = client;
    this.url = url;
    this.params = params;
  }

  chartCreator(data){
    data.items.forEach((chartData) => {
      var chart = new Chart(chartData.name, chartData.id, chartData.key, chartData.status, chartData.tags,
        chartData.publishedVersionThumbnailUrl, chartData.publishedVersionThumbnailUrl, chartData.events, chartData.archived);
      this.items.push(chart);
    });
  }

  fetch(fetchParams = {}){
    return this.client.get(this.url, {params: fetchParams})
            .then( (res) => {
              if(res.data.next_page_starts_after){
                this.nextPageStartsAfter = res.data.next_page_starts_after;
                this.nextPageMustBeFetched = true;
              } else {
                this.nextPageMustBeFetched = false;
              }
              /*
              if(res.data.previous_page_ends_before){
                this.previousPageEndsBefore = res.data.previous_page_ends_before;
              }
              */
              this.chartCreator(res.data)
            });
  }

  [Symbol.asyncIterator](){
    let _this = this;

    return {
      async next(){
        if(_this.nextPageMustBeFetched && _this.items.length === 0){
          await _this.fetch(_this.params);
        } else if(_this.nextPageMustBeFetched && _this.nextPageStartsAfter){
          _this.params.start_after_id = _this.nextPageStartsAfter;
          await _this.fetch(_this.params);
        }
        if(!_this.items[_this.index]){
          return {undefined, done: true};
        }
        else {
          return {value: _this.items[_this.index++], done: false};
        }
    }
  };
  }
}

module.exports = IterableAsyncCharts;
