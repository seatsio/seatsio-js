const BestAvailableObjects = require('../Events/BestAvailableObjects.js')
const ChangeObjectStatusResult = require('../Events/ChangeObjectStatusResult.js')
const EventReportItem = require('../Reports/EventReportItem.js')
const ChartReportItem = require('../Reports/ChartReportItem.js')
const helperFunctions = require('./helperFunctions')

module.exports = {

  /**
   * @param {object} data
   * @returns {BestAvailableObjects}
   */
  createBestAvailableObjects (data) {
    return new BestAvailableObjects(data.objects, this.createChangeObjectStatusDetails(data.objectDetails), data.nextToEachOther)
  },

  /**
   * @param {object} data
   * @returns {ChangeObjectStatusResult}
   */
  createChangeObjectStatusResult (data) {
    return new ChangeObjectStatusResult(this.createChangeObjectStatusDetails(data.objects))
  },

  createChangeObjectStatusDetails (data) {
    let objectDetails = {}
    for (let key in data) {
      objectDetails[key] = this.createEventReportItem(data[key])
    }
    return objectDetails
  },

  /**
   * @param {object} reportsData
   * @returns {Object.<string, EventReportItem>}
   */
  createEventReport (reportsData) {
    let reportObjects = {}
    for (const key of Object.keys(reportsData)) {
      reportObjects[key] = reportsData[key].map(data => this.createEventReportItem(data))
    }
    return reportObjects
  },

  /**
   *
   */
  createEventReportItem (data) {
    // let labels = helperFunctions.labelCreator(data)
    return new EventReportItem(data)
  },

  /**
   * @param {object} reportsData
   * @returns {Object.<string, ChartReportItem>}
   */
  createChartReport (reportsData) {
    let reportObjects = {}
    for (const key of Object.keys(reportsData)) {
      reportObjects[key] = reportsData[key].map(data => {
        // let labels = helperFunctions.labelCreator(data)
        return new ChartReportItem(data)
      }
      )
    }
    return reportObjects
  }

}
