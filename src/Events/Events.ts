import { Page } from '../Page'
import { Lister } from '../Lister'
import { EventObjectInfo, EventObjectInfoJson } from './EventObjectInfo'
import { Channels } from './Channels'
import { StatusChange, StatusChangeJson } from './StatusChange'
import { EventDeserializer } from './EventDeserializer'
import { ChangeObjectStatusResult } from './ChangeObjectStatusResult'
import { BestAvailableObjects } from './BestAvailableObjects'
import { Event, EventJson } from './Event'
import { Axios } from 'axios'
import { Dict } from '../Dict'
import { StatusChangeRequest } from './StatusChangeRequest'
import { CreateEventParams } from './CreateEventParams'
import { UpdateEventParams } from './UpdateEventParams'
import { BestAvailableParams } from './BestAvailableParams'

export interface ObjectIdAndTicketType {
    objectId: string
    ticketType?: string
    quantity?: number
}

export type ObjectOrObjects = string | string[] | ObjectIdAndTicketType | ObjectIdAndTicketType[]

export class Events {
    channels: Channels
    client: Axios

    constructor (client: Axios) {
        this.client = client
        this.channels = new Channels(this.client)
    }

    create (chartKey: string, params?: CreateEventParams) {
        const requestParameters: Dict<any> = {}

        requestParameters.chartKey = chartKey

        if (params !== undefined) {
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

            if (params.date !== undefined) {
                requestParameters.date = params.date.toString()
            }

            if (params.channels !== undefined) {
                requestParameters.channels = params.channels
            }

            if (params.forSaleConfig !== undefined) {
                requestParameters.forSaleConfig = params.forSaleConfig
            }
        }

        return this.client.post('/events', requestParameters)
            .then(res => new EventDeserializer().fromJson(res.data))
    }

    createMultiple (chartKey: string, events?: CreateEventParams[]) {
        const requestParameters: Dict<any> = {}

        requestParameters.chartKey = chartKey
        requestParameters.events = []

        if (events) {
            for (let i = 0; i < events.length; i++) {
                const eventRequest: Dict<any> = {}
                const eventParams = events[i]
                if (eventParams.key !== undefined) {
                    eventRequest.eventKey = eventParams.key
                }

                if (eventParams.tableBookingConfig !== undefined) {
                    eventRequest.tableBookingConfig = eventParams.tableBookingConfig
                }

                if (eventParams.objectCategories !== undefined) {
                    eventRequest.objectCategories = eventParams.objectCategories
                }

                if (eventParams.categories !== undefined) {
                    eventRequest.categories = eventParams.categories
                }

                if (eventParams.name !== undefined) {
                    eventRequest.name = eventParams.name
                }

                if (eventParams.date !== undefined) {
                    eventRequest.date = eventParams.date.toString()
                }

                if (eventParams.channels !== undefined) {
                    eventRequest.channels = eventParams.channels
                }

                if (eventParams.forSaleConfig !== undefined) {
                    eventRequest.forSaleConfig = eventParams.forSaleConfig
                }

                requestParameters.events.push(eventRequest)
            }
        }

        return this.client.post('/events/actions/create-multiple', requestParameters)
            .then(res => {
                const result = []
                const deserializer = new EventDeserializer()
                for (const event of res.data.events) {
                    result.push(deserializer.fromJson(event))
                }
                return result
            })
    }

    retrieve (eventKey: string): Promise<Event> {
        return this.client.get(`/events/${encodeURIComponent(eventKey)}`)
            .then(res => new EventDeserializer().fromJson(res.data))
    }

    update (eventKey: string, params: UpdateEventParams) {
        const requestParameters: Dict<any> = {}

        if (params.chartKey !== undefined) {
            requestParameters.chartKey = params.chartKey
        }

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

        if (params.date !== undefined) {
            requestParameters.date = params.date.toString()
        }

        if (params.isInThePast !== undefined) {
            requestParameters.isInThePast = params.isInThePast
        }

        return this.client.post(`events/${encodeURIComponent(eventKey)}`, requestParameters)
    }

    delete (eventKey: string) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}`)
    }

    listAll (requestParameters = {}) {
        return this.iterator().all(requestParameters)
    }

    listFirstPage (pageSize: number | null = null) {
        return this.iterator().firstPage(null, pageSize)
    }

    listPageAfter (afterId: number, pageSize: number | null = null) {
        return this.iterator().pageAfter(afterId, null, pageSize)
    }

    listPageBefore (beforeId: number, pageSize: number | null = null) {
        return this.iterator().pageBefore(beforeId, null, pageSize)
    }

    iterator () {
        return new Lister<Event, EventJson>('/events', this.client, 'events', data => {
            const events = data.items.map(eventData => new EventDeserializer().fromJson(eventData))
            return new Page(events, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    statusChanges (eventKey: string) {
        return new Lister<StatusChange, StatusChangeJson>(`/events/${encodeURIComponent(eventKey)}/status-changes`, this.client, 'statusChanges', data => {
            const statusChanges = data.items.map(statusChangesData => new StatusChange(statusChangesData))
            return new Page<StatusChange>(statusChanges, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    statusChangesForObject (eventKey: string, objectId: string) {
        return new Lister<StatusChange, StatusChangeJson>(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(objectId)}/status-changes`, this.client, 'statusChanges', data => {
            const statusChanges = data.items.map(statusChangesData => new StatusChange(statusChangesData))
            return new Page(statusChanges, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    markAsForSale (eventKey: string, objects: string[] | null = null, areaPlaces: object | null = null, categories: string[] | null = null) {
        const requestParameters: Dict<any> = {}
        if (objects !== null) {
            requestParameters.objects = objects
        }
        if (areaPlaces !== null) {
            requestParameters.areaPlaces = areaPlaces
        }
        if (categories !== null) {
            requestParameters.categories = categories
        }

        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-as-for-sale`, requestParameters)
    }

    markAsNotForSale (eventKey: string, objects: string[] | null = null, areaPlaces: object | null = null, categories: string[] | null = null) {
        const requestParameters: Dict<any> = {}
        if (objects !== null) {
            requestParameters.objects = objects
        }
        if (areaPlaces !== null) {
            requestParameters.areaPlaces = areaPlaces
        }
        if (categories !== null) {
            requestParameters.categories = categories
        }

        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-as-not-for-sale`, requestParameters)
    }

    markEverythingAsForSale (eventKey: string) {
        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-everything-as-for-sale`)
    }

    overrideSeasonObjectStatus (eventKey: string, objects: string[]) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/override-season-status`, { objects })
    }

    useSeasonObjectStatus (eventKey: string, objects: string[]) {
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/use-season-status`, { objects })
    }

    updateExtraData (eventKey: string, obj: string, extraData: object) {
        const requestParameters: Dict<any> = {}
        requestParameters.extraData = extraData
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(obj)}/actions/update-extra-data`, requestParameters)
    }

    updateExtraDatas (eventKey: string, extraData: Dict<any>) {
        const requestParameters: Dict<any> = {}
        requestParameters.extraData = extraData
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/update-extra-data`, requestParameters)
    }

    async retrieveObjectInfo (eventKey: string, label: string) {
        const result = await this.retrieveObjectInfos(eventKey, [label])
        return result[label]
    }

    retrieveObjectInfos (eventKey: string, labels: string[]): Promise<Dict<EventObjectInfo>> {
        const params = new URLSearchParams()
        labels.forEach((label: string) => {
            params.append('label', label)
        })
        return this.client.get(`events/${encodeURIComponent(eventKey)}/objects`, { params })
            .then(res => {
                const objectInfos = res.data
                for (const key of Object.keys(objectInfos)) {
                    objectInfos[key] = new EventObjectInfo(objectInfos[key])
                }
                return objectInfos
            })
    }

    changeObjectStatus (eventKeyOrKeys: string | string[], objectOrObjects: ObjectOrObjects, statusChangeCommandType: string, status: string | null, holdToken: string | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null, allowedPreviousStatuses: string[] | null = null, rejectedPreviousStatuses: string[] | null = null) {
        const request = this.changeObjectStatusRequest(objectOrObjects, statusChangeCommandType, status, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, allowedPreviousStatuses, rejectedPreviousStatuses)
        request.events = Array.isArray(eventKeyOrKeys) ? eventKeyOrKeys : [eventKeyOrKeys]

        return this.client.post('/events/groups/actions/change-object-status?expand=objects', request)
            .then(res => new ChangeObjectStatusResult(res.data.objects))
    }

    changeObjectStatusInBatch (statusChangeRequests: StatusChangeRequest[]) {
        const requests = statusChangeRequests.map(r => {
            const json = this.changeObjectStatusRequest(
                r.objectOrObjects,
                r.statusChangeCommandType,
                r.status,
                r.holdToken,
                r.orderId,
                r.keepExtraData,
                r.ignoreChannels,
                r.channelKeys,
                r.allowedPreviousStatuses,
                r.rejectedPreviousStatuses
            )
            json.event = r.eventKey
            return json
        })
        const request = { statusChanges: requests }

        return this.client.post('/events/actions/change-object-status?expand=objects', request)
            .then(res => res.data.results.map((r: Dict<EventObjectInfoJson>) => new ChangeObjectStatusResult(r.objects)))
    }

    changeObjectStatusRequest (objectOrObjects: ObjectOrObjects, statusChangeCommandType: string | null, status: string | null, holdToken: string | null, orderId: string | null, keepExtraData: boolean | null, ignoreChannels: boolean | null, channelKeys: string[] | null = null, allowedPreviousStatuses: string[] | null = null, rejectedPreviousStatuses: string[] | null = null) {
        const request: Dict<any> = {}
        request.objects = this.normalizeObjects(objectOrObjects)
        if (statusChangeCommandType !== null) {
            request.type = statusChangeCommandType
        }
        if (status !== null) {
            request.status = status
        }
        if (holdToken !== null) {
            request.holdToken = holdToken
        }
        if (orderId !== null) {
            request.orderId = orderId
        }
        if (keepExtraData !== null) {
            request.keepExtraData = keepExtraData
        }
        if (ignoreChannels !== null) {
            request.ignoreChannels = ignoreChannels
        }
        if (channelKeys !== null) {
            request.channelKeys = channelKeys
        }
        if (allowedPreviousStatuses !== null) {
            request.allowedPreviousStatuses = allowedPreviousStatuses
        }
        if (rejectedPreviousStatuses !== null) {
            request.rejectedPreviousStatuses = rejectedPreviousStatuses
        }
        return request
    }

    book (eventKeyOrKeys: string | string[], objectOrObjects: ObjectOrObjects, holdToken: string | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, 'CHANGE_STATUS_TO', EventObjectInfo.BOOKED, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys)
    }

    bookBestAvailable (eventKey: string, bestAvailableParams: BestAvailableParams, holdToken: string | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null) {
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), bestAvailableParams, EventObjectInfo.BOOKED, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys)
    }

    release (eventKeyOrKeys: string | string[], objectOrObjects: ObjectOrObjects, holdToken: string | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, 'RELEASE', null, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys)
    }

    hold (eventKeyOrKeys: string | string[], objectOrObjects: ObjectOrObjects, holdToken: string, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, 'CHANGE_STATUS_TO', EventObjectInfo.HELD, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys)
    }

    holdBestAvailable (eventKey: string, bestAvailableParams: BestAvailableParams, holdToken: string, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null) {
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), bestAvailableParams, EventObjectInfo.HELD, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys)
    }

    changeBestAvailableObjectStatus (eventKey: string, bestAvailableParams: BestAvailableParams, status: string, holdToken: string | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null) {
        const requestParameters: Dict<any> = {}
        requestParameters.status = status
        if (holdToken !== null) {
            requestParameters.holdToken = holdToken
        }
        if (orderId !== null) {
            requestParameters.orderId = orderId
        }
        if (keepExtraData !== null) {
            requestParameters.keepExtraData = keepExtraData
        }
        if (ignoreChannels !== null) {
            requestParameters.ignoreChannels = ignoreChannels
        }
        if (channelKeys !== null) {
            requestParameters.channelKeys = channelKeys
        }
        requestParameters.bestAvailable = bestAvailableParams

        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/change-object-status`, requestParameters)
            .then(res => new BestAvailableObjects(res.data))
    }

    normalizeObjects (objectOrObjects: ObjectOrObjects): ObjectIdAndTicketType[] {
        if (Array.isArray(objectOrObjects)) {
            if (objectOrObjects.length === 0) {
                return []
            }
            return objectOrObjects.map((obj) => {
                if (typeof obj === 'object') {
                    return obj
                }
                return { objectId: obj }
            })
        }
        // @ts-ignore
        return this.normalizeObjects([objectOrObjects])
    }
}
