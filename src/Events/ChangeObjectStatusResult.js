const utilities = require('../utilities/reportUtility.js')

class ChangeObjectStatusResult {
    /**
     * @param {Object.<string, {EventReportItem}>} objects
     */
    constructor (objects) {
        this.objects = utilities.createChangeObjectStatusDetails(objects)
    }
}

module.exports = ChangeObjectStatusResult
