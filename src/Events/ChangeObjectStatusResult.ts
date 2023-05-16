import { Utilities } from '../utilities/reportUtility'

export class ChangeObjectStatusResult {
    objects: any

    constructor (objects: any) {
        this.objects = Utilities.createChangeObjectStatusDetails(objects)
    }
}
