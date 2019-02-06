const AsyncIterator = require('../AsyncIterator.js')
const PageFetcher = require('../PageFetcher.js')
const Page = require('../Page.js')
const Lister = require('../Lister.js')
const utilities = require('../utilities.js')

class Subaccounts {
  /**
   * @param {SeatsioClient} client
   */
  constructor (client) {
    this.client = client
    this.active = new AsyncIterator('/subaccounts/active', this.client, 'subaccounts')
    this.inactive = new AsyncIterator('/subaccounts/inactive', this.client, 'subaccounts')
  }

  /**
   * @param {string} id
   * @returns {Promise<Subaccount>} Promise object that will resolve to a Subaccount object
   */
  retrieve (id) {
    return this.client.get(`/subaccounts/${id}`).then((res) => utilities.createSubaccount(res.data))
  }

  /**
   * @param {?string} name
   * @returns {Promise<Subaccount>} Promise object that will resolve to a Subaccount object
   */
  create (name = null) {
    return this.doCreate(null, name)
  }

  /**
   * @param {string} email
   * @param {?string} name
   * @returns {Promise<Subaccount>} Promise object that will resolve to a Subaccount object
   */
  createWithEmail (email, name = null) {
    return this.doCreate(email, name)
  }

  /**
   * @param {?string} email
   * @param {?string} name
   * @returns {Promise<Subaccount>} Promise object that will resolve to a Subaccount object
   */
  doCreate (email = null, name = null) {
    let requestParameters = {}

    if (name !== null) {
      requestParameters.name = name
    }

    if (email !== null) {
      requestParameters.email = email
    }

    return this.client.post('/subaccounts', requestParameters)
      .then((res) => utilities.createSubaccount(res.data))
  }

  /**
   * @param {string} id
   * @param {?string} name
   * @param {?string} email
   * @returns {Promise}
   */
  update (id, name = null, email = null) {
    let requestParameters = {}

    if (name !== null) {
      requestParameters.name = name
    }

    if (email !== null) {
      requestParameters.email = email
    }

    return this.client.post(`/subaccounts/${id}`, requestParameters)
  }

  activate (id) {
    return this.client.post(`/subaccounts/${id}/actions/activate`)
  }

  deactivate (id) {
    return this.client.post(`/subaccounts/${id}/actions/deactivate`)
  }

  /**
   * @param {string} id
   * @returns {Promise<string>} Promise object that will resolve to a string
   */
  regenerateSecretKey (id) {
    return this.client.post(`/subaccounts/${id}/secret-key/actions/regenerate`).then((res) => res.data)
  }

  /**
   * @param {string} id
   * @returns {Promise<string>} Promise object that will resolve to a string
   */
  regenerateDesignerKey (id) {
    return this.client.post(`/subaccounts/${id}/designer-key/actions/regenerate`).then((res) => res.data)
  }

  /**
   * @param {string} id
   * @param {string} chartKey
   * @returns {Promise<Chart>} Promise object that will resolve to a Chart object
   */
  copyChartToParent (id, chartKey) {
    return this.client.post(`/subaccounts/${id}/charts/${chartKey}/actions/copy-to/parent`)
      .then((res) => utilities.createChart(res.data))
  }

  /**
   * @param {string} fromId
   * @param {string} toId
   * @param {string} chartKey
   * @returns {Promise<Chart>} Promise object that will resolve to a Chart object
   */
  copyChartToSubaccount (fromId, toId, chartKey) {
    return this.client.post(`/subaccounts/${fromId}/charts/${chartKey}/actions/copy-to/${toId}`)
      .then((res) => utilities.createChart(res.data))
  }

  /**
   * @returns {AsyncIterator}
   */
  listAll (requestParameters = {}) {
    return new AsyncIterator('/subaccounts', this.client, 'subaccounts', requestParameters)
  }

  /**
   * @returns {Page}
   */
  listFirstPage (queryParams = null, pageSize = null) {
    return this.iterator().firstPage(queryParams, pageSize)
  }

  /**
   * @returns {Page}
   */
  listPageAfter (afterId, queryParams = null, pageSize = null) {
    return this.iterator().pageAfter(afterId, queryParams, pageSize)
  }

  /**
   * @returns {Page}
   */
  listPageBefore (beforeId, queryParams = null, pageSize = null) {
    return this.iterator().pageBefore(beforeId, queryParams, pageSize)
  }

  /**
   * @returns {Lister}
   */
  iterator () {
    return new Lister(new PageFetcher('/subaccounts', this.client, results => {
      let subaccounts = results.items.map((subaccountsData) => utilities.createSubaccount(subaccountsData))
      let after_id = results.next_page_starts_after ? results.next_page_starts_after : null
      let before_id = results.previous_page_ends_before ? results.previous_page_ends_before : null
      return new Page(subaccounts, after_id, before_id)
    }))
  }
}

module.exports = Subaccounts
