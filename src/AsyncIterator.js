const Page = require('./Page.js')
const utilities = require('./utilities.js')

class AsyncIterator {
  /**
     * @param {string} url
     * @param {SeatsioClient} client
     * @param {string} objType
     * @param {object} params
     */
  constructor (url, client, objType, params = {}) {
    this.url = url
    this.client = client
    this.objType = objType
    this.params = params
    this.items = []
    this.pages = []
    this.index = 0
    this.nextPageMustBeFetched = true
  }

  charts (data) {
    let charts = []
    data.items.forEach((chartData) => {
      let chart = utilities.createChart(chartData)
      this.items.push(chart)
      charts.push(chart)
    })

    this.pages.push(new Page(charts, data.next_page_starts_after, data.previous_page_ends_before))
  }

  events (data) {
    let events = []
    data.items.forEach(eventData => {
      let event = utilities.createEvent(eventData)
      this.items.push(event)
      events.push(event)
    })
    this.pages.push(new Page(events, data.next_page_starts_after, data.previous_page_ends_before))
  }

  statusChanges (data) {
    let statusChanges = []
    data.items.forEach((statusData) => {
      let status = utilities.createStatusChange(statusData)
      this.items.push(status)
      statusChanges.push(status)
    })
    this.pages.push(new Page(statusChanges, data.next_page_starts_after, data.previous_page_ends_before))
  }

  subaccounts (data) {
    let subaccounts = []
    data.items.forEach((subaccountData) => {
      let subaccount = utilities.createSubaccount(subaccountData)
      this.items.push(subaccount)
      subaccounts.push(subaccount)
    })
    this.pages.push(new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before))
  }

  fetch (fetchParams = {}) {
    return this.client.get(this.url, { params: fetchParams })
      .then((res) => {
        if (res.data.next_page_starts_after) {
          this.nextPageStartsAfter = res.data.next_page_starts_after
          this.nextPageMustBeFetched = true
        } else {
          this.nextPageMustBeFetched = false
        }

        switch (this.objType) {
          case 'charts':
            this.charts(res.data)
            break
          case 'events':
            this.events(res.data)
            break
          case 'statusChanges':
            this.statusChanges(res.data)
            break
          case 'subaccounts':
            this.subaccounts(res.data)
            break
        }
      })
  }

  [Symbol.asyncIterator] () {
    let _this = this

    return {
      async next () {
        if (_this.nextPageMustBeFetched && _this.items.length === 0) {
          await _this.fetch(_this.params)
        } else if (_this.nextPageMustBeFetched && !_this.items[_this.index]) {
          _this.params.start_after_id = _this.nextPageStartsAfter
          await _this.fetch(_this.params)
        }
        if (!_this.items[_this.index]) {
          return Promise.resolve({
            done: true
          })
        } else {
          return Promise.resolve({ value: _this.items[_this.index++], done: false })
        }
      }
    }
  }
}

module.exports = AsyncIterator
