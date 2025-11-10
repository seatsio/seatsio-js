import { Season } from './Season'
import { EventDeserializer } from '../Events/EventDeserializer'
import { Axios } from 'axios'
import { SeatsioClient } from '../SeatsioClient'
import { EventJson } from '../Events/Event'
import { CreateSeasonParams } from './CreateSeasonParams'
import { Dict } from '../Dict'
import { UpdateSeasonParams } from './UpdateSeasonParams'

export class Seasons {
    client: Axios
    seatsioClient: SeatsioClient

    constructor (client: Axios, seatsioClient: SeatsioClient) {
        this.client = client
        this.seatsioClient = seatsioClient
    }

    create (chartKey: string, seasonParams: CreateSeasonParams | null = null) {
        const requestParameters: Dict<any> = {}

        requestParameters.chartKey = chartKey

        if (seasonParams !== null) {
            if (seasonParams._key !== undefined) {
                requestParameters.key = seasonParams._key
            }

            if (seasonParams.name !== undefined) {
                requestParameters.name = seasonParams._name
            }

            if (seasonParams._numberOfEvents !== undefined) {
                requestParameters.numberOfEvents = seasonParams._numberOfEvents
            }

            if (seasonParams._eventKeys !== undefined) {
                requestParameters.eventKeys = seasonParams._eventKeys
            }

            if (seasonParams._objectCategories !== undefined) {
                requestParameters.objectCategories = seasonParams._objectCategories
            }

            if (seasonParams._categories !== undefined) {
                requestParameters.categories = seasonParams._categories
            }

            if (seasonParams._tableBookingConfig !== undefined) {
                requestParameters.tableBookingConfig = seasonParams._tableBookingConfig
            }

            if (seasonParams._channels !== undefined) {
                requestParameters.channels = seasonParams._channels
            }

            if (seasonParams._forSaleConfig !== undefined) {
                requestParameters.forSaleConfig = seasonParams._forSaleConfig
            }

            if (seasonParams._forSalePropagated !== undefined) {
                requestParameters.forSalePropagated = seasonParams._forSalePropagated
            }
        }

        return this.client.post('/seasons', requestParameters)
            .then(res => new Season(res.data))
    }

    async update (seasonKey: string, params: UpdateSeasonParams) {
        const requestParameters: Dict<any> = {}

        if (params.key !== undefined) {
            requestParameters.eventKey = params.key
        }

        if (params.tableBookingConfig !== undefined) {
            requestParameters.tableBookingConfig = params.tableBookingConfig
        }

        if (params.objectCategories !== undefined) {
            requestParameters.objectCategories = params.objectCategories
        }

        if (params.categories !== undefined) {
            requestParameters.categories = params.categories
        }

        if (params.name !== undefined) {
            requestParameters.name = params.name
        }

        if (params.forSalePropagated !== undefined) {
            requestParameters.forSalePropagated = params.forSalePropagated
        }

        return this.client.post(`events/${encodeURIComponent(seasonKey)}`, requestParameters)
    }

    createPartialSeason (topLevelSeasonKey: string, partialSeasonKey: string | null = null, name: string | null = null, eventKeys: string[] | null = null) {
        const requestParameters: Dict<any> = {}

        if (partialSeasonKey !== null) {
            requestParameters.key = partialSeasonKey
        }

        if (name !== null) {
            requestParameters.name = name
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
