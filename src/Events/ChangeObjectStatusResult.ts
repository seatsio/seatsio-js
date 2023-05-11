import { Utilities } from '../utilities/reportUtility'

export class ChangeObjectStatusResult {
    objects: any;
    /**
     * @param {Object.<string, {ObjectInfo}>} objects
     */
    constructor (objects: any) {
        this.objects = Utilities.createChangeObjectStatusDetails(objects)
    }
}
