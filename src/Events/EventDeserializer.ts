import { Season } from '../Seasons/Season.js'
import { Event, EventJson } from './Event.js'

export class EventDeserializer {
    fromJson (json: EventJson) {
        if (json.isSeason) {
            return new Season(json)
        }
        return new Event(json)
    }
}
