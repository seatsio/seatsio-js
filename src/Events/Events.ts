import { Page } from '../Page'
import { Lister } from '../Lister'
import { EventObjectInfo, EventObjectInfoJson } from './EventObjectInfo'
import { Channels } from './Channels'
import { StatusChange, StatusChangeJson } from './StatusChange'
import { EventDeserializer } from './EventDeserializer'
import { ChangeObjectStatusResult } from './ChangeObjectStatusResult'
import { BestAvailableObjects } from './BestAvailableObjects'
import { TableBookingConfig } from './TableBookingConfig'
import { Event, EventJson } from './Event'
import { Axios } from 'axios'
import { Category } from '../Charts/Category'
import { Dict } from '../Dict'
import { StatusChangeRequest } from './StatusChangeRequest'

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

    create (chartKey: string, eventKey: string | null = null, tableBookingConfig: TableBookingConfig | null = null, socialDistancingRulesetKey: string | null = null, objectCategories: object | null = null, categories: Category[] | null = null) {
        const requestParameters: Dict<any> = {}

        requestParameters.chartKey = chartKey

        if (eventKey !== null) {
            requestParameters.eventKey = eventKey
        }

        if (tableBookingConfig !== null) {
            requestParameters.tableBookingConfig = tableBookingConfig
        }

        if (socialDistancingRulesetKey !== null) {
            requestParameters.socialDistancingRulesetKey = socialDistancingRulesetKey
        }

        if (objectCategories !== null) {
            requestParameters.objectCategories = objectCategories
        }

        if (categories != null) {
            requestParameters.categories = categories
        }

        return this.client.post('/events', requestParameters)
            .then(res => new EventDeserializer().fromJson(res.data))
    }

    static eventCreationParams (eventKey: string | null = null, tableBookingConfig: TableBookingConfig | null = null, socialDistancingRulesetKey: string | null = null, objectCategories: object | null = null, categories: Category[] | null = null) {
        const eventDefinition: Dict<any> = {}
        eventDefinition.eventKey = eventKey
        eventDefinition.tableBookingConfig = tableBookingConfig
        eventDefinition.socialDistancingRulesetKey = socialDistancingRulesetKey
        eventDefinition.objectCategories = objectCategories
        eventDefinition.categories = categories
        return eventDefinition
    }

    createMultiple (chartKey: string, events?: any[]) {
        const requestParameters: Dict<any> = {}

        requestParameters.chartKey = chartKey
        requestParameters.events = []

        if (events) {
            for (let i = 0; i < events.length; i++) {
                const event: Dict<any> = {}
                if (events[i].eventKey !== null) {
                    event.eventKey = events[i].eventKey
                }

                if (events[i].tableBookingConfig !== null) {
                    event.tableBookingConfig = events[i].tableBookingConfig
                }

                if (events[i].socialDistancingRulesetKey !== null) {
                    event.socialDistancingRulesetKey = events[i].socialDistancingRulesetKey
                }

                if (events[i].objectCategories !== null) {
                    event.objectCategories = events[i].objectCategories
                }

                if (events[i].categories != null) {
                    event.categories = events[i].categories
                }
                requestParameters.events.push(event)
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

    update (eventKey: string, chartKey: string | null = null, newEventKey: string | null = null, tableBookingConfig: TableBookingConfig | null = null, socialDistancingRulesetKey: string | null = null, objectCategories: object | null = null, categories: Category[] | null = null) {
        const requestParameters: Dict<any> = {}

        if (chartKey !== null) {
            requestParameters.chartKey = chartKey
        }

        if (newEventKey !== null) {
            requestParameters.eventKey = newEventKey
        }

        if (tableBookingConfig !== null) {
            requestParameters.tableBookingConfig = tableBookingConfig
        }

        if (socialDistancingRulesetKey !== null) {
            requestParameters.socialDistancingRulesetKey = socialDistancingRulesetKey
        }

        if (objectCategories !== null) {
            requestParameters.objectCategories = objectCategories
        }

        if (categories != null) {
            requestParameters.categories = categories
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

    changeObjectStatus (eventKeyOrKeys: string | string[], objectOrObjects: ObjectOrObjects, status: string, holdToken: string | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null, ignoreSocialDistancing: boolean | null = null, allowedPreviousStatuses: string[] | null = null, rejectedPreviousStatuses: string[] | null = null) {
        const request = this.changeObjectStatusRequest(objectOrObjects, status, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, ignoreSocialDistancing, allowedPreviousStatuses, rejectedPreviousStatuses)
        request.events = Array.isArray(eventKeyOrKeys) ? eventKeyOrKeys : [eventKeyOrKeys]

        return this.client.post('/events/groups/actions/change-object-status?expand=objects', request)
            .then(res => new ChangeObjectStatusResult(res.data.objects))
    }

    changeObjectStatusInBatch (statusChangeRequests: StatusChangeRequest[]) {
        const requests = statusChangeRequests.map(r => {
            const json = this.changeObjectStatusRequest(
                r.objectOrObjects,
                r.status,
                r.holdToken,
                r.orderId,
                r.keepExtraData,
                r.ignoreChannels,
                r.channelKeys,
                null,
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

    changeObjectStatusRequest (objectOrObjects: ObjectOrObjects, status: string, holdToken: string | null, orderId: string | null, keepExtraData: boolean | null, ignoreChannels: boolean | null, channelKeys: string[] | null = null, ignoreSocialDistancing: boolean | null = null, allowedPreviousStatuses: string[] | null = null, rejectedPreviousStatuses: string[] | null = null) {
        const request: Dict<any> = {}
        request.objects = this.normalizeObjects(objectOrObjects)
        request.status = status
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
        if (ignoreSocialDistancing !== null) {
            request.ignoreSocialDistancing = ignoreSocialDistancing
        }
        if (allowedPreviousStatuses !== null) {
            request.allowedPreviousStatuses = allowedPreviousStatuses
        }
        if (rejectedPreviousStatuses !== null) {
            request.rejectedPreviousStatuses = rejectedPreviousStatuses
        }
        return request
    }

    book (eventKeyOrKeys: string | string[], objectOrObjects: ObjectOrObjects, holdToken: string | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null, ignoreSocialDistancing: boolean | null = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, EventObjectInfo.BOOKED, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, ignoreSocialDistancing)
    }

    bookBestAvailable (eventKey: string, number: number, categories: string[] | null = null, holdToken: string | null = null, extraData: Dict<any> | null = null, ticketTypes: string[] | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null, tryToPreventOrphanSeats: boolean | null = null) {
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, EventObjectInfo.BOOKED, categories, holdToken, extraData, ticketTypes, orderId, keepExtraData, ignoreChannels, channelKeys, tryToPreventOrphanSeats)
    }

    release (eventKeyOrKeys: string | string[], objectOrObjects: ObjectOrObjects, holdToken: string | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, EventObjectInfo.FREE, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys)
    }

    hold (eventKeyOrKeys: string | string[], objectOrObjects: ObjectOrObjects, holdToken: string, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null, ignoreSocialDistancing: boolean | null = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, EventObjectInfo.HELD, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, ignoreSocialDistancing)
    }

    holdBestAvailable (eventKey: string, number: number, holdToken: string, categories: string[] | null = null, extraData: Dict<any> | null = null, ticketTypes: string[] | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null, tryToPreventOrphanSeats: boolean | null = null) {
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, EventObjectInfo.HELD, categories, holdToken, extraData, ticketTypes, orderId, keepExtraData, ignoreChannels, channelKeys, tryToPreventOrphanSeats)
    }

    changeBestAvailableObjectStatus (eventKey: string, number: number, status: string, categories: string[] | null = null, holdToken: string | null = null, extraData: Dict<any> | null = null, ticketTypes: string[] | null = null, orderId: string | null = null, keepExtraData: boolean | null = null, ignoreChannels: boolean | null = null, channelKeys: string[] | null = null, tryToPreventOrphanSeats: boolean | null = null) {
        const requestParameters: Dict<any> = {}
        const bestAvailable: Dict<any> = {}
        requestParameters.status = status
        bestAvailable.number = number
        if (holdToken !== null) {
            requestParameters.holdToken = holdToken
        }
        if (orderId !== null) {
            requestParameters.orderId = orderId
        }
        if (categories !== null) {
            bestAvailable.categories = categories
        }
        if (extraData !== null) {
            bestAvailable.extraData = extraData
        }
        if (ticketTypes !== null) {
            bestAvailable.ticketTypes = ticketTypes
        }

        if (tryToPreventOrphanSeats !== null) {
            bestAvailable.tryToPreventOrphanSeats = tryToPreventOrphanSeats
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
        requestParameters.bestAvailable = bestAvailable

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
