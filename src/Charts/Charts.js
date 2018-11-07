const PageFetcher = require('../PageFetcher.js');
const Chart = require('./Chart.js');
const Page = require('../Page.js');
const Lister = require('./Lister.js');
const IterableChartPages = require('./IterableChartPages.js');
const IterableAsyncCharts = require('./IterableAsyncCharts.js');

class Charts {
  constructor(client){
    this.client = client;
    this.archive = new IterableChartPages('/charts/archive', this.client);
  }

  create(name = null, venueType = null, categories = null){
    let requestParams = {};

    if(name !== null){
      requestParams.name = name;
    }

    if(venueType !== null){
      requestParams.venueType = venueType;
    }

    if(categories !== null){
      requestParams.categories = categories;
    }

    return this.client.post('charts', requestParams)
                          .then( (res) => res.data );
  }

  addTag(key, tag){
    let url = `charts/${key}/tags/${encodeURIComponent(tag)}`;
    return this.client.post(url);
  }

  removeTag(key, tag){
    let url = `charts/${key}/tags/${encodeURIComponent(tag)}`;
    return this.client.delete(url);
  }

  retrieve(key){
    return this.client.get(`charts/${key}`).then( (res) => res.data);
  }

  retrieveWithEvents(key){
    return this.client.get(`charts/${key}?expand=events`)
                      .then( (res) => res.data);
  }

  retrievePublishedVersion(key){
    return this.client.get(`charts/${key}/version/published`)
                            .then( (res) => res.data);
  }

  retrieveDraftVersion(key){
    return this.client.get(`charts/${key}/version/draft`)
                      .then( (res) => res.data);
  }

  retrieveDraftVersionThumbnail(key){
    return this.client.get(`/charts/${key}/version/draft/thumbnail`)
                      .then( (res) => res.data);
  }

  retrievePublishedVersionThumbnail(key){
    return this.client.get(`/charts/${key}/version/published/thumbnail`)
                      .then( (res) => res.data);
  }


  listAllTags(){
    return this.client.get('/charts/tags')
                      .then( (res) => res.data.tags );
  }

  copy(key){
    return this.client.post(`charts/${key}/version/published/actions/copy`)
                      .then( (res) => res.data);
  }

  copyDraftVersion(key){
    return this.client.post(`charts/${key}/version/draft/actions/copy`)
                      .then( (res) => res.data);
  }

  copyToSubaccount(key, subaccountId){
    return this.client.post(`charts/${key}/version/published/actions/copy-to/${subaccountId}`)
                      .then( (res) => res.data);
  }

  discardDraftVersion(key){
    return this.client.post(`/charts/${key}/version/draft/actions/discard`);
  }

  publishDraftVersion(key){
    return this.client.post( `charts/${key}/version/draft/actions/publish`);
  }

  moveToArchive(key){
    return this.client.post(`charts/${key}/actions/move-to-archive`);
  }

  moveOutOfArchive(key){
    return this.client.post(`charts/${key}/actions/move-out-of-archive`);
  }

  update(key, name = null, categories = null){
    let requestParams = {};

    if(name !== null){
      requestParams.name = name;
    }

    if(categories !== null){
      requestParams.categories = categories;
    }

    return this.client.post(`/charts/${key}`, requestParams);
  }

  listFirstPage(chartListParams = null, pageSize = null){
    return this.iterator().firstPage(chartListParams, pageSize);
  }

  listPageAfter(afterId, chartListParams = null, pageSize = null){
    return this.iterator().pageAfter(afterId, chartListParams, pageSize);
  }

  listPageBefore(beforeId, chartListParams = null, pageSize = null){
    return this.iterator().pageBefore(beforeId, chartListParams, pageSize);
  }

  getAll(params = null){
    return new IterableChartPages('/charts', this.client, params);
  }

  listAll(params = {}){
    return new IterableAsyncCharts('/charts', this.client, params);
  }



  iterator(){
    return new Lister(new PageFetcher('/charts', this.client, function (results) {
      let chartItems = results.items.map((chartData) => {
        return new Chart(chartData.name, chartData.id, chartData.key, chartData.status, chartData.tags,
          chartData.publishedVersionThumbnailUrl, chartData.publishedVersionThumbnailUrl, chartData.events, chartData.archived);
      });
      return new Page(chartItems);
    }));
  }
}

module.exports = Charts;
