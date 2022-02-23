const Event = require('../Events/Event.js')

class Season extends Event {
    /**
     * @param {object} season
     */
    constructor (season) {
        super(season)
        this.partialSeasonKeys = season.partialSeasonKeys
        this.events = season.events ? season.events.map(e => new Event(e)) : undefined
        if (this.isTopLevelSeason()) {
            this.seasonKey = undefined
        }
    }

    isSeason () {
        return true
    }

    isTopLevelSeason () {
        return this.partialSeasonKeys !== undefined
    }

    isPartialSeason () {
        return !this.isTopLevelSeason()
    }
}

module.exports = Season
