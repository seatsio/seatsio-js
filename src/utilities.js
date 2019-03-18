const Account = require('./Accounts/Account.js')
const Event = require('./Events/Event.js')
const ObjectStatus = require('./Events/ObjectStatus.js')
const BestAvailableObjects = require('./Events/BestAvailableObjects.js')
const ChangeObjectStatusResult = require('./Events/ChangeObjectStatusResult.js')
const Chart = require('./Charts/Chart.js')
const HoldToken = require('./HoldTokens/HoldToken.js')
const EventReportItem = require('./Reports/EventReportItem.js')
const ChartReportItem = require('./Reports/ChartReportItem.js')
const Subaccount = require('./Subaccounts/Subaccount.js')
const StatusChange = require('./Events/StatusChange.js')
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
   * @returns {ObjectStatus}
   */
  createObjectStatus (data) {
    return new ObjectStatus(data.status, data.ticketType, data.holdToken, data.orderId, data.extraData, data.quantity)
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
   * @param {object} data
   * @returns {Event}
   */
  createEvent (data) {
    return new Event(data)
  },

  /**
   * @param {objects[]} eventsData
   * @returns {Event[]}
   */
  createMultipleEvents (eventsData) {
    return eventsData.map(eventData => this.createEvent(eventData))
  },

  /**
   * @param {objects[]} statusChangesData
   * @returns {StatusChange[]}
   */
  createMultipleStatusChanges (statusChangesData) {
    return statusChangesData.map(statusChangesData => new StatusChange(statusChangesData))
  },

  /**
   * @param {object} data
   * @returns {Chart}
   */
  createChart (data) {
    return new Chart(data)
  },

  /**
   * @param {object} data
   * @returns {Account}
   */
  createAccount (data) {
    return new Account(data)
  },

  /**
   * @param {object} data
   * @returns {HoldToken}
   */
  createHoldToken (data) {
    return new HoldToken(data)
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
        return new ChartReportItem(data.label, labels, data.categoryLabel, data.categoryKey, data.entrance,
          data.objectType, data.section,
          data.capacity)
      }
      )
    }
    return reportObjects
  },

  /**
   * @param {object} data
   * @returns {Subaccount}
   */
  createSubaccount (data) {
    return new Subaccount(data)
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
