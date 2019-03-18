const Event = require('../Events/Event.js')

class Chart {
  /**
   * @param {object} chart
   */
  constructor (chart) {
    this.name = chart.name
    this.id = chart.id
    this.key = chart.key
    this.status = chart.status
    this.tags = chart.tags
    this.publishedVersionThumbnailUrl = chart.publishedVersionThumbnailUrl
    this.draftVersionThumbnailUrl = chart.draftVersionThumbnailUrl || null
    this.events = chart.events ? chart.events.map(event => new Event(event)) : []
    this.archived = chart.archived
  }
}

module.exports = Chart
