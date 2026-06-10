import { Utilities } from '../utilities/reportUtility.js'
import { EventObjectInfo, EventObjectInfoJson } from './EventObjectInfo.js'
import { Dict } from '../Dict.js'

export class ChangeObjectStatusResult {
    objects: Dict<EventObjectInfo>

    constructor (objects: Dict<EventObjectInfoJson>) {
        this.objects = Utilities.createChangeObjectStatusDetails(objects)
    }
}
