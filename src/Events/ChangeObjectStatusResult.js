import { Utilities } from '../utilities/reportUtility'

export class ChangeObjectStatusResult {
    /**
     * @param {Object.<string, {ObjectInfo}>} objects
     */
    constructor (objects) {
        this.objects = Utilities.createChangeObjectStatusDetails(objects)
    }
}
