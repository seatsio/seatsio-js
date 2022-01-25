const Event = require('../Events/Event.js')

class Season {
    /**
     * @param {object} season
     */
    constructor (season) {
        this.id = season.id
        this.key = season.key
        this.seasonEvent = new Event(season.seasonEvent)
        this.partialSeasonKeys = season.partialSeasonKeys
        this.events = season.events.map(e => new Event(e))
    }
}

module.exports = Season
