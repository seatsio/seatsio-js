import { Season } from './Season'
import { EventDeserializer } from '../Events/EventDeserializer'

export class Seasons {
    client: any;
    seatsioClient: any;
    constructor (client: any, seatsioClient: any) {
        this.client = client
        this.seatsioClient = seatsioClient
    }

    create (chartKey: any, seasonParams = null) {
        const requestParameters = {}

        // @ts-expect-error TS(2339): Property 'chartKey' does not exist on type '{}'.
        requestParameters.chartKey = chartKey

        if (seasonParams !== null) {
            // @ts-expect-error TS(2339): Property '_key' does not exist on type 'never'.
            if (seasonParams._key !== null) {
                // @ts-expect-error TS(2339): Property 'key' does not exist on type '{}'.
                requestParameters.key = seasonParams._key
            }

            // @ts-expect-error TS(2339): Property '_numberOfEvents' does not exist on type ... Remove this comment to see the full error message
            if (seasonParams._numberOfEvents !== null) {
                // @ts-expect-error TS(2339): Property 'numberOfEvents' does not exist on type '... Remove this comment to see the full error message
                requestParameters.numberOfEvents = seasonParams._numberOfEvents
            }

            // @ts-expect-error TS(2339): Property '_eventKeys' does not exist on type 'neve... Remove this comment to see the full error message
            if (seasonParams._eventKeys !== null) {
                // @ts-expect-error TS(2339): Property 'eventKeys' does not exist on type '{}'.
                requestParameters.eventKeys = seasonParams._eventKeys
            }

            // @ts-expect-error TS(2339): Property '_tableBookingConfig' does not exist on t... Remove this comment to see the full error message
            if (seasonParams._tableBookingConfig !== null) {
                // @ts-expect-error TS(2339): Property 'tableBookingConfig' does not exist on ty... Remove this comment to see the full error message
                requestParameters.tableBookingConfig = seasonParams._tableBookingConfig
            }

            // @ts-expect-error TS(2339): Property '_socialDistancingRulesetKey' does not ex... Remove this comment to see the full error message
            if (seasonParams._socialDistancingRulesetKey !== null) {
                // @ts-expect-error TS(2339): Property 'socialDistancingRulesetKey' does not exi... Remove this comment to see the full error message
                requestParameters.socialDistancingRulesetKey = seasonParams._socialDistancingRulesetKey
            }
        }

        return this.client.post('/seasons', requestParameters)
            .then((res: any) => new Season(res.data));
    }

    /**
     * @param {string} topLevelSeasonKey
     * @param {?string} partialSeasonKey
     * @param {?string[]} eventKeys
     * @returns {Promise<Season>}
     */
    createPartialSeason (topLevelSeasonKey: any, partialSeasonKey = null, eventKeys = null) {
        const requestParameters = {}

        if (partialSeasonKey !== null) {
            // @ts-expect-error TS(2339): Property 'key' does not exist on type '{}'.
            requestParameters.key = partialSeasonKey
        }

        if (eventKeys !== null) {
            // @ts-expect-error TS(2339): Property 'eventKeys' does not exist on type '{}'.
            requestParameters.eventKeys = eventKeys
        }
        return this.client.post(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons`, requestParameters)
            .then((res: any) => new Season(res.data));
    }

    /**
     * @param {string} key
     * @param {?number} numberOfEvents
     * @param {?string[]} eventKeys
     * @returns {Promise<Season>}
     */
    createEvents (key: any, numberOfEvents = null, eventKeys = null) {
        const requestParameters = { }

        if (numberOfEvents !== null) {
            // @ts-expect-error TS(2339): Property 'numberOfEvents' does not exist on type '... Remove this comment to see the full error message
            requestParameters.numberOfEvents = numberOfEvents
        }

        if (eventKeys !== null) {
            // @ts-expect-error TS(2339): Property 'eventKeys' does not exist on type '{}'.
            requestParameters.eventKeys = eventKeys
        }

        return this.client.post(`/seasons/${encodeURIComponent(key)}/actions/create-events`, requestParameters)
            .then((res: any) => res.data.events.map((e: any) => new EventDeserializer().fromJson(e)));
    }

    /**
     * @param {string} topLevelSeasonKey
     * @param {string} partialSeasonKey
     * @param {string[]} eventKeys
     * @returns {Promise<Season>}
     */
    addEventsToPartialSeason (topLevelSeasonKey: any, partialSeasonKey: any, eventKeys: any) {
        const requestParameters = { eventKeys }
        return this.client.post(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons/${encodeURIComponent(partialSeasonKey)}/actions/add-events`, requestParameters)
            .then((res: any) => new Season(res.data));
    }

    /**
     * @param {string} topLevelSeasonKey
     * @param {string} partialSeasonKey
     * @param {string} eventKey
     * @returns {Promise<Season>}
     */
    async removeEventFromPartialSeason (topLevelSeasonKey: any, partialSeasonKey: any, eventKey: any) {
        return this.client.delete(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons/${encodeURIComponent(partialSeasonKey)}/events/${encodeURIComponent(eventKey)}`)
            .then((res: any) => new Season(res.data));
    }

    /**
     * @param {string} key
     * @returns {Promise<Season>}
     */
    retrieve (key: any) {
        return this.seatsioClient.events.retrieve(key)
    }
}
