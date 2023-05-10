import { Utilities } from '../utilities/reportUtility'

export class BestAvailableObjects {
    /**
     * @param {object} data
     */
    constructor (data) {
        this.objects = data.objects
        this.objectDetails = Utilities.createChangeObjectStatusDetails(data.objectDetails)
        this.nextToEachOther = data.nextToEachOther
    }
}
