import { Utilities } from '../utilities/reportUtility'
import { EventObjectInfo, EventObjectInfoJson } from './EventObjectInfo'
import { Dict } from '../Dict'

export class ChangeObjectStatusResult {
    objects: Dict<EventObjectInfo>

    constructor (objects: Dict<EventObjectInfoJson>) {
        this.objects = Utilities.createChangeObjectStatusDetails(objects)
    }
}
