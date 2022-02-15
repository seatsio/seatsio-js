const Event = require('../Events/Event.js')

class Season extends Event {
    /**
     * @param {object} season
     */
    constructor (season) {
        super(season)
        this.partialSeasonKeys = season.partialSeasonKeys
        this.events = season.events ? season.events.map(e => new Event(e)) : undefined
    }

    isSeason () {
        return true
    }
}

module.exports = Season
