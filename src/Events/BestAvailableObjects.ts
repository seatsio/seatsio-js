import { Utilities } from '../utilities/reportUtility'

export class BestAvailableObjects {
    nextToEachOther: any
    objectDetails: any
    objects: any

    constructor (data: any) {
        this.objects = data.objects
        this.objectDetails = Utilities.createChangeObjectStatusDetails(data.objectDetails)
        this.nextToEachOther = data.nextToEachOther
    }
}
