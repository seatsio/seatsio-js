import { Utilities } from '../utilities/reportUtility.js'
import { Dict } from '../Dict.js'

export class BestAvailableObjects {
    nextToEachOther: boolean
    objectDetails: object
    objects: string[]

    constructor (json: Dict<any>) {
        this.objects = json.objects
        this.objectDetails = Utilities.createChangeObjectStatusDetails(json.objectDetails)
        this.nextToEachOther = json.nextToEachOther
    }
}
