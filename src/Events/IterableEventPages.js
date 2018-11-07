const Page = require('../Page.js');
const Event = require('./Event.js');

class IterablePages{
  constructor(url, client){
    this.pages = [];
    this.client = client;
    this.url = url;
  }

  pageCreator(data, afterId, prevId){
    var events = data.items.map((eventData) => {
      return new Event(eventData.id, eventData.key, eventData.bookWholeTables,
                          eventData.supportsBestAvailable, eventData.forSaleConfig,
                            eventData.chartKey, eventData.createdOn, eventData.updatedOn);
    });
    var page = new Page(events, afterId, prevId);
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

  subsequentPage(n){
    return this.fetchAfter(n);
  }

  [Symbol.asyncIterator](){
    var _this = this;

    return {
      next(){
      if(_this.pages.length === 0){
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
