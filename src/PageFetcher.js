class PageFetcher {
  constructor(url, client, pageCreator){
    this.url = url;
    this.client = client;
    this.pageCreator = pageCreator;
  }

  fetchAfter(afterId, queryParams, pageSize){
    if(afterId !== null){
      queryParams['start_after_id'] = afterId;
    }

    return this.fetch(queryParams, pageSize);
  }

  fetchBefore(beforeId, queryParams, pageSize){
    if(beforeId !== null){
      queryParams['end_before_id'] = beforeId;
    }

    return this.fetch(queryParams, pageSize);
  }

  fetch(queryParams, pageSize){
    if(pageSize){
      queryParams['limit'] = pageSize;
    }

    var res = this.client.get(this.url, {
                          params : {
                            'query' : queryParams
                          }});
    return res.data;
  }


}
