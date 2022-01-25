const Page = require('../Page.js')
const Lister = require('../Lister.js')
const Season = require('./Season')

class Seasons {
    /**
     * @param {SeatsioClient} client
     */
    constructor (client) {
        this.client = client
    }

    /**
     * @param {string} chartKey
     * @param {?string} key
     * @param {?number} numberOfEvents
     * @param {?string[]} eventKeys
     * @param {?TableBookingConfig} tableBookingConfig
     * @param {?string} socialDistancingRulesetKey
     * @returns {Promise<Season>}
     */
    create (chartKey, key = null, numberOfEvents = null, eventKeys = null, tableBookingConfig = null, socialDistancingRulesetKey = null) {
        const requestParameters = {}

        requestParameters.chartKey = chartKey

        if (key !== null) {
            requestParameters.key = key
        }

        if (numberOfEvents !== null) {
            requestParameters.numberOfEvents = numberOfEvents
        }

        if (eventKeys !== null) {
            requestParameters.eventKeys = eventKeys
        }

        if (tableBookingConfig !== null) {
            requestParameters.tableBookingConfig = tableBookingConfig
        }

        if (socialDistancingRulesetKey !== null) {
            requestParameters.socialDistancingRulesetKey = socialDistancingRulesetKey
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
     * @returns {Promise<Season>}
     */
    retrieve (key) {
        return this.client.get(`/seasons/${encodeURIComponent(key)}`)
            .then((res) => new Season(res.data))
    }

    /**
     * @param {string} topLevelSeasonKey
     * @param {?string} partialSeasonKey
     * @returns {Promise<Season>}
     */
    retrievePartialSeason (topLevelSeasonKey, partialSeasonKey) {
        return this.client.get(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons/${encodeURIComponent(partialSeasonKey)}`)
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
            .then((res) => new Season(res.data))
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
     * @param {string} key
     * @returns {Promise}
     */
    delete (key) {
        return this.client.delete(`/seasons/${encodeURIComponent(key)}`)
    }

    /**
     * @param {string} topLevelSeasonKey
     * @param {string} partialSeasonKey
     * @returns {Promise<void>}
     */
    deletePartialSeason (topLevelSeasonKey, partialSeasonKey) {
        return this.client.delete(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons/${encodeURIComponent(partialSeasonKey)}`)
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
     * @param {?object} requestParameters
     * @returns {AsyncIterator<Season>}
     */
    listAll (requestParameters = {}) {
        return this.iterator().all(requestParameters)
    }

    /**
     * @param {?number} pageSize
     * @returns {Page<Season>}
     */
    listFirstPage (pageSize = null) {
        return this.iterator().firstPage(null, pageSize)
    }

    /**
     * @param {?string} afterId
     * @param {?number} pageSize
     * @returns {Page<Season>}
     */
    listPageAfter (afterId, pageSize = null) {
        return this.iterator().pageAfter(afterId, null, pageSize)
    }

    /**
     * @param {?string} beforeId
     * @param {?number} pageSize
     * @returns {Page<Season>}
     */
    listPageBefore (beforeId, pageSize = null) {
        return this.iterator().pageBefore(beforeId, null, pageSize)
    }

    /**
     * @returns {Lister}
     */
    iterator () {
        return new Lister('/seasons', this.client, 'seasons', (data) => {
            const seasons = data.items.map(seasonData => new Season(seasonData))
            return new Page(seasons, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}

module.exports = Seasons
