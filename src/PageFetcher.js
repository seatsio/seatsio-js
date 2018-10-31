class PageFetcher {
  constructor(url, client, pageCreator){
    this.url = url;
    this.client = client;
    this.pageCreator = pageCreator;
  }

  fetchAfter(afterId, queryParams, pageSize){
    if(queryParams === null){
      var queryParams = {};
    }

    if(afterId){
      queryParams.start_after_id = afterId;
    }
    return this.fetch(queryParams, pageSize);
  }

  fetchBefore(beforeId, queryParams, pageSize){
    if(queryParams === null){
      var queryParams = {};
    }

    if(beforeId){
      queryParams.end_before_id = beforeId;
    }

    return this.fetch(queryParams, pageSize);
  }

  async fetch(queryParams, pageSize){
    if(pageSize){
      queryParams.limit = pageSize;
    }
    
    //console.log(queryParams);

    var res = await this.client.get(this.url, {params: queryParams}).then( (res) => res.data);
    return this.pageCreator(res);
  }
}

module.exports = PageFetcher;
