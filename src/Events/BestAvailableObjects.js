class BestAvailableObjects {
  /**
     * @param {string[]} objects
     * @param {Object.<string, EventReportItem>} objectDetails
     * @param {boolean} nextToEachOther
     */
  constructor (objects, objectDetails, nextToEachOther) {
    this.objects = objects
    this.objectDetails = objectDetails
    this.nextToEachOther = nextToEachOther
  }
}

module.exports = BestAvailableObjects
