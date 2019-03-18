const BestAvailableObjects = require('./Events/BestAvailableObjects.js')
const ChangeObjectStatusResult = require('./Events/ChangeObjectStatusResult.js')
const EventReportItem = require('./Reports/EventReportItem.js')
const ChartReportItem = require('./Reports/ChartReportItem.js')
const LabelClasses = require('./Common/Labels.js')

module.exports = {
  /**
   * @param data
   * @returns {Labels}
   */
  labelCreator (data) {
    let labels = {}
    if (data.labels.parent) {
      labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels.own.label, data.labels.own.type), new LabelClasses.LabelAndType(data.labels.parent.label, data.labels.parent.type))
    } else {
      labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels.own.label, data.labels.own.type))
    }
    if (data.labels.section) {
      labels.section = data.labels.section
    }

    return labels
  },

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
    let labels = this.labelCreator(data)
    return new EventReportItem(data, labels)
  },

  /**
   * @param {object} reportsData
   * @returns {Object.<string, ChartReportItem>}
   */
  createChartReport (reportsData) {
    let reportObjects = {}
    for (const key of Object.keys(reportsData)) {
      reportObjects[key] = reportsData[key].map(data => {
        let labels = this.labelCreator(data)
        return new ChartReportItem(data, labels)
      }
      )
    }
    return reportObjects
  },

  /**
   * @param {StatusChangesParams} params
   * @returns {object}
   */
  combineStatusChangesParams (params) {
    if (!params) return null
    let sort = null
    if (params.sort && params.sortDirection) {
      sort = params.sort + ':' + params.sortDirection
    } else if (!params.sort && params.sortDirection) {
      sort = 'date:' + params.sortDirection
    } else if (params.sort && !params.sortDirection) {
      sort = params.sort + ':asc'
    }

    return {
      sort,
      filter: params.filter
    }
  }

}
