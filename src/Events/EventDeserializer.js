const Season = require('../Seasons/Season')
const Event = require('./Event.js')

class EventDeserializer {
    fromJson (event) {
        if (event.isSeason) {
            return new Season(event)
        }
        return new Event(event)
    }
}

module.exports = EventDeserializer
