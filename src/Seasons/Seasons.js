const Season = require('./Season')
const EventDeserializer = require('../Events/EventDeserializer')

class Seasons {
    /**
     * @param {Axios} client
     * @param {SeatsioClient} seatsioClient
     */
    constructor (client, seatsioClient) {
        this.client = client
        this.seatsioClient = seatsioClient
    }

    /**
     * @param {string} chartKey
     * @param {?seasonParams} SeasonParams
     * @returns {Promise<Season>}
     */
    create (chartKey, seasonParams = null) {
        const requestParameters = {}

        requestParameters.chartKey = chartKey

        if (seasonParams !== null) {
            if (seasonParams._key !== null) {
                requestParameters.key = seasonParams._key
            }

            if (seasonParams._numberOfEvents !== null) {
                requestParameters.numberOfEvents = seasonParams._numberOfEvents
            }

            if (seasonParams._eventKeys !== null) {
                requestParameters.eventKeys = seasonParams._eventKeys
            }

            if (seasonParams._tableBookingConfig !== null) {
                requestParameters.tableBookingConfig = seasonParams._tableBookingConfig
            }

            if (seasonParams._socialDistancingRulesetKey !== null) {
                requestParameters.socialDistancingRulesetKey = seasonParams._socialDistancingRulesetKey
            }
        }

        return this.client.post('/seasons', requestParameters)
            .then((res) => new Season(res.data))
    }

    /**
     * @param {string} topLevelSeasonKey
     * @param {?string} partialSeasonKey
     * @param {?string[]} eventKeys
     * @returns {Promise<Season>}
     */
    createPartialSeason (topLevelSeasonKey, partialSeasonKey = null, eventKeys = null) {
        const requestParameters = {}

        if (partialSeasonKey !== null) {
            requestParameters.key = partialSeasonKey
        }

        if (eventKeys !== null) {
            requestParameters.eventKeys = eventKeys
        }
        return this.client.post(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons`, requestParameters)
            .then((res) => new Season(res.data))
    }

    /**
     * @param {string} key
     * @param {?number} numberOfEvents
     * @param {?string[]} eventKeys
     * @returns {Promise<Season>}
     */
    createEvents (key, numberOfEvents = null, eventKeys = null) {
        const requestParameters = { }

        if (numberOfEvents !== null) {
            requestParameters.numberOfEvents = numberOfEvents
        }

        if (eventKeys !== null) {
            requestParameters.eventKeys = eventKeys
        }

        return this.client.post(`/seasons/${encodeURIComponent(key)}/actions/create-events`, requestParameters)
            .then((res) => res.data.events.map(e => new EventDeserializer().fromJson(e)))
    }

    /**
     * @param {string} topLevelSeasonKey
     * @param {string} partialSeasonKey
     * @param {string[]} eventKeys
     * @returns {Promise<Season>}
     */
    addEventsToPartialSeason (topLevelSeasonKey, partialSeasonKey, eventKeys) {
        const requestParameters = { eventKeys }
        return this.client.post(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons/${encodeURIComponent(partialSeasonKey)}/actions/add-events`, requestParameters)
            .then((res) => new Season(res.data))
    }

    /**
     * @param {string} topLevelSeasonKey
     * @param {string} partialSeasonKey
     * @param {string} eventKey
     * @returns {Promise<Season>}
     */
    async removeEventFromPartialSeason (topLevelSeasonKey, partialSeasonKey, eventKey) {
        return this.client.delete(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons/${encodeURIComponent(partialSeasonKey)}/events/${encodeURIComponent(eventKey)}`)
            .then((res) => new Season(res.data))
    }

    /**
     * @param {string} key
     * @returns {Promise<Season>}
     */
    retrieve (key) {
        return this.seatsioClient.events.retrieve(key)
    }
}

module.exports = Seasons
