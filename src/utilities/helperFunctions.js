const LabelClasses = require('../Common/Labels.js')

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
