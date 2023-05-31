import { Season } from '../Seasons/Season'
import { Event, EventJson } from './Event'

export class EventDeserializer {
    fromJson (json: EventJson) {
        if (json.isSeason) {
            return new Season(json)
        }
        return new Event(json)
    }
}
