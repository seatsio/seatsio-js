import { Season } from '../Seasons/Season'
import { Event } from './Event'

export class EventDeserializer {
    fromJson (event) {
        if (event.isSeason) {
            return new Season(event)
        }
        return new Event(event)
    }
}

