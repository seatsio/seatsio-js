const utilities = require('../utilities/reportUtility.js')

class BestAvailableObjects {
    /**
     * @param {object} data
     */
    constructor (data) {
        this.objects = data.objects
        this.objectDetails = utilities.createChangeObjectStatusDetails(data.objectDetails)
        this.nextToEachOther = data.nextToEachOther
    }
}

module.exports = BestAvailableObjects
