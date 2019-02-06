const PageFetcher = require('../PageFetcher.js')
const Page = require('../Page.js')
const Lister = require('../Lister.js')
const AsyncIterator = require('../AsyncIterator.js')
const utilities = require('../utilities.js')

class Charts {
  /**
   * @param {SeatsioClient} client
   */
  constructor (client) {
    this.client = client
    this.archive = new AsyncIterator('/charts/archive', this.client, 'charts')
  }

  /* @return  Chart */
  /**
   * @param {?string} name
   * @param {?string} venueType
   * @param {?Object[]} categories
   * @returns {Promise<Chart>} Promise that resolves to Chart object
   */
  create (name = null, venueType = null, categories = null) {
    let requestParameters = {}

    if (name !== null) {
      requestParameters.name = name
    }

    if (venueType !== null) {
      requestParameters.venueType = venueType
    }

    if (categories !== null) {
      requestParameters.categories = categories
    }

    return this.client.post('charts', requestParameters)
      .then((res) => utilities.createChart(res.data))
  }

  /**
   * @param {string} key
   * @param {?string} name
   * @param {Object[]} categories
   * @returns {Promise}
   */
  update (key, name = null, categories = null) {
    let requestParameters = {}

    if (name !== null) {
      requestParameters.name = name
    }

    if (categories !== null) {
      requestParameters.categories = categories
    }

    return this.client.post(`/charts/${key}`, requestParameters)
  }

  /**
   * @param {string} key
   * @returns {Promise<Chart>} Promise that resolves to a Chart object
   */
  retrieve (key) {
    return this.client.get(`charts/${key}`)
      .then((res) => utilities.createChart(res.data))
  }

  /**
   * @param {string} key
   * @returns {Promise<Chart>} Promise that resolves to a Chart object
   */
  retrieveWithEvents (key) {
    return this.client.get(`charts/${key}?expand=events`)
      .then((res) => utilities.createChart(res.data))
  }

  /**
   * @param {string} key
   * @returns {Promise} Promise that resolves to JSON
   */
  retrievePublishedVersion (key) {
    return this.client.get(`charts/${key}/version/published`)
      .then((res) => res.data)
  }

  /**
   * @param {string} key
   * @returns {Promise} Promise that resolves to JSON
   */
  retrieveDraftVersion (key) {
    return this.client.get(`charts/${key}/version/draft`)
      .then((res) => res.data)
  }

  /**
   * @param {string} key
   * @returns {Promise}
   */
  publishDraftVersion (key) {
    return this.client.post(`charts/${key}/version/draft/actions/publish`)
  }

  /**
   * @param {string} key
   * @returns {Promise}
   */
  discardDraftVersion (key) {
    return this.client.post(`/charts/${key}/version/draft/actions/discard`)
  }

  /**
   * @param {string} key
   * @returns {Promise}
   */
  moveToArchive (key) {
    return this.client.post(`charts/${key}/actions/move-to-archive`)
  }

  /**
   * @param {string} key
   * @returns {Promise}
   */
  moveOutOfArchive (key) {
    return this.client.post(`charts/${key}/actions/move-out-of-archive`)
  }

  /**
   * @param {string} key
   * @returns {Promise<Chart>} Promise that resolves to a Chart object
   */
  copy (key) {
    return this.client.post(`charts/${key}/version/published/actions/copy`)
      .then((res) => utilities.createChart(res.data))
  }

  /**
   * @param {string} key
   * @returns {Promise<Chart>} Promise that resolves to a Chart object
   */
  copyDraftVersion (key) {
    return this.client.post(`charts/${key}/version/draft/actions/copy`)
      .then((res) => utilities.createChart(res.data))
  }

  /**
   * @param {string} key
   * @returns {Promise<Chart>} Promise that resolves to a Chart object
   */
  copyToSubaccount (key, subaccountId) {
    return this.client.post(`charts/${key}/version/published/actions/copy-to/${subaccountId}`)
      .then((res) => utilities.createChart(res.data))
  }

  /**
   * @param {string} key
   * @returns {Promise} Promise that resolves to an SVG doc
   */
  retrievePublishedVersionThumbnail (key) {
    return this.client.get(`/charts/${key}/version/published/thumbnail`)
      .then((res) => res.data)
  }

  /**
   * @param {string} key
   * @returns {Promise} Promise that resolves to an SVG doc
   */
  retrieveDraftVersionThumbnail (key) {
    return this.client.get(`/charts/${key}/version/draft/thumbnail`)
      .then((res) => res.data)
  }

  /**
   * @returns {string[]}
   */
  listAllTags () {
    return this.client.get('/charts/tags')
      .then((res) => res.data.tags)
  }

  /**
   * @param {string} key
   * @param {string} tag
   * @returns {Promise}
   */
  addTag (key, tag) {
    let url = `charts/${key}/tags/${encodeURIComponent(tag)}`
    return this.client.post(url)
  }

  /**
   * @param {string} key
   * @param {string} tag
   * @returns {Promise}
   */
  removeTag (key, tag) {
    let url = `charts/${key}/tags/${encodeURIComponent(tag)}`
    return this.client.delete(url)
  }

  /**
   * @param {object} requestParameters
   * @returns {AsyncIterator}
   */
  listAll (requestParameters = {}) {
    return new AsyncIterator('/charts', this.client, 'charts', requestParameters)
  }

  /**
   * @param {?ChartListParams} chartListParams
   * @param {?number} pageSize
   * @returns {Page}
   */
  listFirstPage (chartListParams = null, pageSize = null) {
    return this.iterator().firstPage(chartListParams, pageSize)
  }

  /**
   * @param {string} afterId
   * @param {?ChartListParams} chartListParameters
   * @param {?number} pageSize
   * @returns {Page}
   */
  listPageAfter (afterId, chartListParameters = null, pageSize = null) {
    return this.iterator().pageAfter(afterId, chartListParameters, pageSize)
  }

  /**
   * @param {string} beforeId
   * @param {?ChartListParams} chartListParameters
   * @param {?number} pageSize
   * @returns {Page}
   */
  listPageBefore (beforeId, chartListParameters = null, pageSize = null) {
    return this.iterator().pageBefore(beforeId, chartListParameters, pageSize)
  }

  /**
   * @returns {Lister}
   */
  iterator () {
    return new Lister(new PageFetcher('/charts', this.client, results => {
      let chartItems = results.items.map((chartData) => utilities.createChart(chartData))
      let afterId = results.next_page_starts_after ? results.next_page_starts_after : null
      let beforeId = results.previous_page_ends_before ? results.previous_page_ends_before : null
      return new Page(chartItems, afterId, beforeId)
    }))
  }
}

module.exports = Charts
