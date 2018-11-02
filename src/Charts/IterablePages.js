const Page = require('../Page.js');
const Chart = require('./Chart.js');

class IterablePages{
  constructor(url, client){
    this.pages = []; //array of pages (a page is an array of charts)
    this.client = client;
    this.url = url;
  }

  pageCreator(data, afterId, prevId){
    var charts = data.items.map((chartData) => {
      return new Chart(chartData.name, chartData.id, chartData.key, chartData.status, chartData.tags,
        chartData.publishedVersionThumbnailUrl, chartData.publishedVersionThumbnailUrl, chartData.events, chartData.archived);
    });
    var page = new Page(charts, afterId, prevId);
    this.pages.push(page);
    return page;
  }

  fetch(){
    return this.client.get(this.url)
            .then( (res) => {
              if(res.data.next_page_starts_after){
                this.next_page_starts_after = res.data.next_page_starts_after;
                this.fetchNextPage = true;
              }
              return {value: this.pageCreator(res.data, res.data.next_page_starts_after, res.data.previous_page_ends_before), done: false}
            });
  }

  fetchAfter(afterId){
    return this.client.get(this.url, {params: {'start_after_id': afterId}})
                      .then( (res) => {
                        if(res.data.next_page_starts_after){
                          this.next_page_starts_after = res.data.next_page_starts_after;
                          this.fetchNextPage = true;
                        } else {
                          this.fetchNextPage = false;
                        }
                        return {value: this.pageCreator(res.data, res.data.next_page_starts_after, res.data.previous_page_ends_before), done: false}
                      });
  }

  firstPage(){
    return this.fetch();
    //pageCreator(chartCreator(fetchPrRes));
  }

  subsequentPage(n){
    return this.fetchAfter(n);
  }

  [Symbol.asyncIterator](){
    var _this = this;

    return {
      next(){
      if(_this.pages.length == 0){
        return _this.fetch();
      } else if(_this.fetchNextPage){
        return _this.subsequentPage(_this.next_page_starts_after);
      }
      else {
        return {undefined, done: true};
      }
    }
  };
  }
}

module.exports = IterablePages;
