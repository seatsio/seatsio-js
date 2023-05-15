import { Page } from '../Page'
import { Lister } from '../Lister'
import { EventObjectInfo } from './EventObjectInfo'
import { Channels } from './Channels'
import { StatusChange } from './StatusChange'
import { EventDeserializer } from './EventDeserializer'
import { ChangeObjectStatusResult } from './ChangeObjectStatusResult'
import { BestAvailableObjects } from './BestAvailableObjects'

export class Events {
    channels: any
    client: any
    constructor (client: any) {
        this.client = client
        this.channels = new Channels(this.client)
    }

    create (chartKey: any, eventKey = null, tableBookingConfig = null, socialDistancingRulesetKey = null, objectCategories = null, categories = null) {
        const requestParameters = {}

        // @ts-expect-error TS(2339): Property 'chartKey' does not exist on type '{}'.
        requestParameters.chartKey = chartKey

        if (eventKey !== null) {
            // @ts-expect-error TS(2339): Property 'eventKey' does not exist on type '{}'.
            requestParameters.eventKey = eventKey
        }

        if (tableBookingConfig !== null) {
            // @ts-expect-error TS(2339): Property 'tableBookingConfig' does not exist on ty... Remove this comment to see the full error message
            requestParameters.tableBookingConfig = tableBookingConfig
        }

        if (socialDistancingRulesetKey !== null) {
            // @ts-expect-error TS(2339): Property 'socialDistancingRulesetKey' does not exi... Remove this comment to see the full error message
            requestParameters.socialDistancingRulesetKey = socialDistancingRulesetKey
        }

        if (objectCategories !== null) {
            // @ts-expect-error TS(2339): Property 'objectCategories' does not exist on type... Remove this comment to see the full error message
            requestParameters.objectCategories = objectCategories
        }

        if (categories != null) {
            // @ts-expect-error TS(2339): Property 'categories' does not exist on type '{}'.
            requestParameters.categories = categories
        }

        return this.client.post('/events', requestParameters)
            .then((res: any) => new EventDeserializer().fromJson(res.data))
    }

    static eventCreationParams (eventKey = null, tableBookingConfig = null, socialDistancingRulesetKey = null, objectCategories = null, categories = null) {
        const eventDefinition = {}
        // @ts-expect-error TS(2339): Property 'eventKey' does not exist on type '{}'.
        eventDefinition.eventKey = eventKey
        // @ts-expect-error TS(2339): Property 'tableBookingConfig' does not exist on ty... Remove this comment to see the full error message
        eventDefinition.tableBookingConfig = tableBookingConfig
        // @ts-expect-error TS(2339): Property 'socialDistancingRulesetKey' does not exi... Remove this comment to see the full error message
        eventDefinition.socialDistancingRulesetKey = socialDistancingRulesetKey
        // @ts-expect-error TS(2339): Property 'objectCategories' does not exist on type... Remove this comment to see the full error message
        eventDefinition.objectCategories = objectCategories
        // @ts-expect-error TS(2339): Property 'categories' does not exist on type '{}'.
        eventDefinition.categories = categories
        return eventDefinition
    }

    createMultiple (chartKey: any, events: any) {
        const requestParameters = {}

        // @ts-expect-error TS(2339): Property 'chartKey' does not exist on type '{}'.
        requestParameters.chartKey = chartKey
        // @ts-expect-error TS(2339): Property 'events' does not exist on type '{}'.
        requestParameters.events = []

        if (events) {
            for (let i = 0; i < events.length; i++) {
                const event = {}
                if (events[i].eventKey !== null) {
                    // @ts-expect-error TS(2339): Property 'eventKey' does not exist on type '{}'.
                    event.eventKey = events[i].eventKey
                }

                if (events[i].tableBookingConfig !== null) {
                    // @ts-expect-error TS(2339): Property 'tableBookingConfig' does not exist on ty... Remove this comment to see the full error message
                    event.tableBookingConfig = events[i].tableBookingConfig
                }

                if (events[i].socialDistancingRulesetKey !== null) {
                    // @ts-expect-error TS(2339): Property 'socialDistancingRulesetKey' does not exi... Remove this comment to see the full error message
                    event.socialDistancingRulesetKey = events[i].socialDistancingRulesetKey
                }

                if (events[i].objectCategories !== null) {
                    // @ts-expect-error TS(2339): Property 'objectCategories' does not exist on type... Remove this comment to see the full error message
                    event.objectCategories = events[i].objectCategories
                }

                if (events[i].categories != null) {
                    // @ts-expect-error TS(2339): Property 'categories' does not exist on type '{}'.
                    event.categories = events[i].categories
                }
                // @ts-expect-error TS(2339): Property 'events' does not exist on type '{}'.
                requestParameters.events.push(event)
            }
        }

        return this.client.post('/events/actions/create-multiple', requestParameters)
            .then((res: any) => {
                const result = []
                const deserializer = new EventDeserializer()
                for (const event of res.data.events) {
                    result.push(deserializer.fromJson(event))
                }
                return result
            })
    }

    retrieve (eventKey: any) {
        return this.client.get(`/events/${encodeURIComponent(eventKey)}`)
            .then((res: any) => new EventDeserializer().fromJson(res.data))
    }

    update (eventKey: any, chartKey = null, newEventKey = null, tableBookingConfig = null, socialDistancingRulesetKey = null, objectCategories = null, categories = null) {
        const requestParameters = {}

        if (chartKey !== null) {
            // @ts-expect-error TS(2339): Property 'chartKey' does not exist on type '{}'.
            requestParameters.chartKey = chartKey
        }

        if (newEventKey !== null) {
            // @ts-expect-error TS(2339): Property 'eventKey' does not exist on type '{}'.
            requestParameters.eventKey = newEventKey
        }

        if (tableBookingConfig !== null) {
            // @ts-expect-error TS(2339): Property 'tableBookingConfig' does not exist on ty... Remove this comment to see the full error message
            requestParameters.tableBookingConfig = tableBookingConfig
        }

        if (socialDistancingRulesetKey !== null) {
            // @ts-expect-error TS(2339): Property 'socialDistancingRulesetKey' does not exi... Remove this comment to see the full error message
            requestParameters.socialDistancingRulesetKey = socialDistancingRulesetKey
        }

        if (objectCategories !== null) {
            // @ts-expect-error TS(2339): Property 'objectCategories' does not exist on type... Remove this comment to see the full error message
            requestParameters.objectCategories = objectCategories
        }

        if (categories != null) {
            // @ts-expect-error TS(2339): Property 'categories' does not exist on type '{}'.
            requestParameters.categories = categories
        }

        return this.client.post(`events/${encodeURIComponent(eventKey)}`, requestParameters)
    }

    delete (eventKey: any) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}`)
    }

    listAll (requestParameters = {}) {
        return this.iterator().all(requestParameters)
    }

    listFirstPage (pageSize = null) {
        return this.iterator().firstPage(null, pageSize)
    }

    listPageAfter (afterId: any, pageSize = null) {
        return this.iterator().pageAfter(afterId, null, pageSize)
    }

    listPageBefore (beforeId: any, pageSize = null) {
        return this.iterator().pageBefore(beforeId, null, pageSize)
    }

    iterator () {
        return new Lister('/events', this.client, 'events', (data: any) => {
            const events = data.items.map((eventData: any) => new EventDeserializer().fromJson(eventData))
            return new Page(events, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    statusChanges (eventKey: any) {
        return new Lister(`/events/${encodeURIComponent(eventKey)}/status-changes`, this.client, 'statusChanges', (data: any) => {
            const statusChanges = data.items.map((statusChangesData: any) => new StatusChange(statusChangesData))
            return new Page(statusChanges, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    statusChangesForObject (eventKey: any, objectId = null) {
        // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
        return new Lister(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(objectId)}/status-changes`, this.client, 'statusChanges', (data: any) => {
            const statusChanges = data.items.map((statusChangesData: any) => new StatusChange(statusChangesData))
            return new Page(statusChanges, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    markAsForSale (eventKey: any, objects = null, areaPlaces = null, categories = null) {
        const requestParameters = {}
        if (objects !== null) {
            // @ts-expect-error TS(2339): Property 'objects' does not exist on type '{}'.
            requestParameters.objects = objects
        }
        if (areaPlaces !== null) {
            // @ts-expect-error TS(2339): Property 'areaPlaces' does not exist on type '{}'.
            requestParameters.areaPlaces = areaPlaces
        }
        if (categories !== null) {
            // @ts-expect-error TS(2339): Property 'categories' does not exist on type '{}'.
            requestParameters.categories = categories
        }

        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-as-for-sale`, requestParameters)
    }

    markAsNotForSale (eventKey: any, objects = null, areaPlaces = null, categories = null) {
        const requestParameters = {}
        if (objects !== null) {
            // @ts-expect-error TS(2339): Property 'objects' does not exist on type '{}'.
            requestParameters.objects = objects
        }
        if (areaPlaces !== null) {
            // @ts-expect-error TS(2339): Property 'areaPlaces' does not exist on type '{}'.
            requestParameters.areaPlaces = areaPlaces
        }
        if (categories !== null) {
            // @ts-expect-error TS(2339): Property 'categories' does not exist on type '{}'.
            requestParameters.categories = categories
        }

        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-as-not-for-sale`, requestParameters)
    }

    markEverythingAsForSale (eventKey: any) {
        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-everything-as-for-sale`)
    }

    updateExtraData (eventKey: any, obj: any, extraData: any) {
        const requestParameters = {}
        // @ts-expect-error TS(2339): Property 'extraData' does not exist on type '{}'.
        requestParameters.extraData = extraData
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(obj)}/actions/update-extra-data`, requestParameters)
    }

    updateExtraDatas (eventKey: any, extraData: any) {
        const requestParameters = {}
        // @ts-expect-error TS(2339): Property 'extraData' does not exist on type '{}'.
        requestParameters.extraData = extraData
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/update-extra-data`, requestParameters)
    }

    async retrieveObjectInfo (eventKey: any, label: any) {
        const result = await this.retrieveObjectInfos(eventKey, [label])
        return result[label]
    }

    retrieveObjectInfos (eventKey: any, labels: any) {
        const params = new URLSearchParams()
        labels.forEach((label: any) => {
            params.append('label', label)
        })
        return this.client.get(`events/${encodeURIComponent(eventKey)}/objects`, { params })
            .then((res: any) => {
                const objectInfos = res.data
                for (const key of Object.keys(objectInfos)) {
                    objectInfos[key] = new EventObjectInfo(objectInfos[key])
                }
                return objectInfos
            })
    }

    changeObjectStatus (eventKeyOrKeys: any, objectOrObjects: any, status: any, holdToken = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null, ignoreSocialDistancing = null, allowedPreviousStatuses = null, rejectedPreviousStatuses = null) {
        const request = this.changeObjectStatusRequest(objectOrObjects, status, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, ignoreSocialDistancing, allowedPreviousStatuses, rejectedPreviousStatuses)
        // @ts-expect-error TS(2339): Property 'events' does not exist on type '{}'.
        request.events = Array.isArray(eventKeyOrKeys) ? eventKeyOrKeys : [eventKeyOrKeys]

        return this.client.post('/events/groups/actions/change-object-status?expand=objects', request)
            .then((res: any) => new ChangeObjectStatusResult(res.data.objects))
    }

    changeObjectStatusInBatch (statusChangeRequests: any) {
        const requests = statusChangeRequests.map((r: any) => {
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
            // @ts-expect-error TS(2339): Property 'event' does not exist on type '{}'.
            json.event = r.eventKey
            return json
        })
        const request = { statusChanges: requests }

        return this.client.post('/events/actions/change-object-status?expand=objects', request)
            .then((res: any) => res.data.results.map((r: any) => new ChangeObjectStatusResult(r.objects)))
    }

    changeObjectStatusRequest (objectOrObjects: any, status: any, holdToken: any, orderId: any, keepExtraData: any, ignoreChannels: any, channelKeys: any, ignoreSocialDistancing: any, allowedPreviousStatuses: any, rejectedPreviousStatuses: any) {
        const request = {}
        // @ts-expect-error TS(2339): Property 'objects' does not exist on type '{}'.
        request.objects = this.normalizeObjects(objectOrObjects)
        // @ts-expect-error TS(2339): Property 'status' does not exist on type '{}'.
        request.status = status
        if (holdToken !== null) {
            // @ts-expect-error TS(2339): Property 'holdToken' does not exist on type '{}'.
            request.holdToken = holdToken
        }
        if (orderId !== null) {
            // @ts-expect-error TS(2339): Property 'orderId' does not exist on type '{}'.
            request.orderId = orderId
        }
        if (keepExtraData !== null) {
            // @ts-expect-error TS(2339): Property 'keepExtraData' does not exist on type '{... Remove this comment to see the full error message
            request.keepExtraData = keepExtraData
        }
        if (ignoreChannels !== null) {
            // @ts-expect-error TS(2339): Property 'ignoreChannels' does not exist on type '... Remove this comment to see the full error message
            request.ignoreChannels = ignoreChannels
        }
        if (channelKeys !== null) {
            // @ts-expect-error TS(2339): Property 'channelKeys' does not exist on type '{}'... Remove this comment to see the full error message
            request.channelKeys = channelKeys
        }
        if (ignoreSocialDistancing !== null) {
            // @ts-expect-error TS(2339): Property 'ignoreSocialDistancing' does not exist o... Remove this comment to see the full error message
            request.ignoreSocialDistancing = ignoreSocialDistancing
        }
        if (allowedPreviousStatuses !== null) {
            // @ts-expect-error TS(2339): Property 'allowedPreviousStatuses' does not exist ... Remove this comment to see the full error message
            request.allowedPreviousStatuses = allowedPreviousStatuses
        }
        if (rejectedPreviousStatuses !== null) {
            // @ts-expect-error TS(2339): Property 'rejectedPreviousStatuses' does not exist... Remove this comment to see the full error message
            request.rejectedPreviousStatuses = rejectedPreviousStatuses
        }
        return request
    }

    book (eventKeyOrKeys: any, objectOrObjects: any, holdToken = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null, ignoreSocialDistancing = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, EventObjectInfo.BOOKED, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, ignoreSocialDistancing)
    }

    bookBestAvailable (eventKey: any, number: any, categories = null, holdToken = null, extraData = null, ticketTypes = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null, tryToPreventOrphanSeats = null) {
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, EventObjectInfo.BOOKED, categories, holdToken, extraData, ticketTypes, orderId, keepExtraData, ignoreChannels, channelKeys, tryToPreventOrphanSeats)
    }

    release (eventKeyOrKeys: any, objectOrObjects: any, holdToken = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, EventObjectInfo.FREE, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys)
    }

    hold (eventKeyOrKeys: any, objectOrObjects: any, holdToken: any, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null, ignoreSocialDistancing = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, EventObjectInfo.HELD, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, ignoreSocialDistancing)
    }

    holdBestAvailable (eventKey: any, number: any, holdToken: any, categories = null, extraData = null, ticketTypes = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null, tryToPreventOrphanSeats = null) {
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, EventObjectInfo.HELD, categories, holdToken, extraData, ticketTypes, orderId, keepExtraData, ignoreChannels, channelKeys, tryToPreventOrphanSeats)
    }

    changeBestAvailableObjectStatus (eventKey: any, number: any, status: any, categories = null, holdToken = null, extraData = null, ticketTypes = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null, tryToPreventOrphanSeats = null) {
        const requestParameters = {}
        const bestAvailable = {}
        // @ts-expect-error TS(2339): Property 'status' does not exist on type '{}'.
        requestParameters.status = status
        // @ts-expect-error TS(2339): Property 'number' does not exist on type '{}'.
        bestAvailable.number = number
        if (holdToken !== null) {
            // @ts-expect-error TS(2339): Property 'holdToken' does not exist on type '{}'.
            requestParameters.holdToken = holdToken
        }
        if (orderId !== null) {
            // @ts-expect-error TS(2339): Property 'orderId' does not exist on type '{}'.
            requestParameters.orderId = orderId
        }
        if (categories !== null) {
            // @ts-expect-error TS(2339): Property 'categories' does not exist on type '{}'.
            bestAvailable.categories = categories
        }
        if (extraData !== null) {
            // @ts-expect-error TS(2339): Property 'extraData' does not exist on type '{}'.
            bestAvailable.extraData = extraData
        }
        if (ticketTypes !== null) {
            // @ts-expect-error TS(2339): Property 'ticketTypes' does not exist on type '{}'... Remove this comment to see the full error message
            bestAvailable.ticketTypes = ticketTypes
        }
        if (tryToPreventOrphanSeats !== null) {
            bestAvailable.tryToPreventOrphanSeats = tryToPreventOrphanSeats
        }
        if (keepExtraData !== null) {
            // @ts-expect-error TS(2339): Property 'keepExtraData' does not exist on type '{... Remove this comment to see the full error message
            requestParameters.keepExtraData = keepExtraData
        }
        if (ignoreChannels !== null) {
            // @ts-expect-error TS(2339): Property 'ignoreChannels' does not exist on type '... Remove this comment to see the full error message
            requestParameters.ignoreChannels = ignoreChannels
        }
        if (channelKeys !== null) {
            // @ts-expect-error TS(2339): Property 'channelKeys' does not exist on type '{}'... Remove this comment to see the full error message
            requestParameters.channelKeys = channelKeys
        }
        // @ts-expect-error TS(2339): Property 'bestAvailable' does not exist on type '{... Remove this comment to see the full error message
        requestParameters.bestAvailable = bestAvailable

        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/change-object-status`, requestParameters)
            .then((res: any) => new BestAvailableObjects(res.data))
    }

    normalizeObjects (objectOrObjects: any): any {
        if (Array.isArray(objectOrObjects)) {
            if (objectOrObjects.length === 0) {
                return []
            }
            return objectOrObjects.map((obj) => {
                if (typeof obj === 'object') {
                    return obj
                }
                if (typeof obj === 'string') {
                    return { objectId: obj }
                }
                return obj
            })
        }
        return this.normalizeObjects([objectOrObjects])
    }
}
