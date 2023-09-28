import { Season } from './Season'
import { EventDeserializer } from '../Events/EventDeserializer'
import { Axios } from 'axios'
import { SeatsioClient } from '../SeatsioClient'
import { EventJson } from '../Events/Event'
import { SeasonParams } from './SeasonParams'
import { Dict } from '../Dict'

export class Seasons {
    client: Axios
    seatsioClient: SeatsioClient

    constructor (client: Axios, seatsioClient: SeatsioClient) {
        this.client = client
        this.seatsioClient = seatsioClient
    }

    create (chartKey: string, seasonParams: SeasonParams | null = null) {
        const requestParameters: Dict<any> = {}

        requestParameters.chartKey = chartKey

        if (seasonParams !== null) {
            if (seasonParams._key !== undefined) {
                requestParameters.key = seasonParams._key
            }

            if (seasonParams._numberOfEvents !== undefined) {
                requestParameters.numberOfEvents = seasonParams._numberOfEvents
            }

            if (seasonParams._eventKeys !== undefined) {
                requestParameters.eventKeys = seasonParams._eventKeys
            }

            if (seasonParams._tableBookingConfig !== undefined) {
                requestParameters.tableBookingConfig = seasonParams._tableBookingConfig
            }

            if (seasonParams._channels !== undefined) {
                requestParameters.channels = seasonParams._channels
            }
        }

        return this.client.post('/seasons', requestParameters)
            .then(res => new Season(res.data))
    }

    createPartialSeason (topLevelSeasonKey: string, partialSeasonKey: string | null = null, eventKeys: string[] | null = null) {
        const requestParameters: Dict<any> = {}

        if (partialSeasonKey !== null) {
            requestParameters.key = partialSeasonKey
        }

        if (eventKeys !== null) {
            requestParameters.eventKeys = eventKeys
        }
        return this.client.post(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons`, requestParameters)
            .then(res => new Season(res.data))
    }

    createEvents (key: string, numberOfEvents: number | null = null, eventKeys: string[] | null = null) {
        const requestParameters: Dict<any> = {}

        if (numberOfEvents !== null) {
            requestParameters.numberOfEvents = numberOfEvents
        }

        if (eventKeys !== null) {
            requestParameters.eventKeys = eventKeys
        }

        return this.client.post(`/seasons/${encodeURIComponent(key)}/actions/create-events`, requestParameters)
            .then(res => res.data.events.map((e: EventJson) => new EventDeserializer().fromJson(e)))
    }

    addEventsToPartialSeason (topLevelSeasonKey: string, partialSeasonKey: string, eventKeys: string[]) {
        const requestParameters = { eventKeys }
        return this.client.post(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons/${encodeURIComponent(partialSeasonKey)}/actions/add-events`, requestParameters)
            .then(res => new Season(res.data))
    }

    async removeEventFromPartialSeason (topLevelSeasonKey: string, partialSeasonKey: string, eventKey: string) {
        return this.client.delete(`/seasons/${encodeURIComponent(topLevelSeasonKey)}/partial-seasons/${encodeURIComponent(partialSeasonKey)}/events/${encodeURIComponent(eventKey)}`)
            .then(res => new Season(res.data))
    }

    retrieve (key: string) {
        return this.seatsioClient.events.retrieve(key)
    }
}
