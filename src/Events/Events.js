const Page = require('../Page.js')
const Lister = require('../Lister.js')
const EventObjectInfo = require('./EventObjectInfo.js')
const Channels = require('./Channels.js')
const StatusChange = require('./StatusChange.js')
const BestAvailableObjects = require('./BestAvailableObjects.js')
const ChangeObjectStatusResult = require('./ChangeObjectStatusResult.js')
const EventDeserializer = require('./EventDeserializer')

class Events {
    /**
     * @param {Axios} client
     */
    constructor (client) {
        this.client = client
        this.channels = new Channels(this.client)
    }

    /* @return Event */
    /**
     * @param {string} chartKey
     * @param {?string} eventKey
     * @param {?TableBookingConfig} tableBookingConfig
     * @param {?string} socialDistancingRulesetKey
     * @param {?object} objectCategories
     * @returns {Promise<Event>}
     */
    create (chartKey, eventKey = null, tableBookingConfig = null, socialDistancingRulesetKey = null, objectCategories = null) {
        const requestParameters = {}

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

        return this.client.post('/events', requestParameters)
            .then((res) => new EventDeserializer().fromJson(res.data))
    }

    /**
     * @param {string} eventKey
     * @returns {Promise<Event>}
     */
    retrieve (eventKey) {
        return this.client.get(`/events/${encodeURIComponent(eventKey)}`)
            .then((res) => new EventDeserializer().fromJson(res.data))
    }

    /**
     * @param {string} eventKey
     * @param {?string} chartKey
     * @param {?string} newEventKey
     * @param {?TableBookingConfig} tableBookingConfig
     * @param {?string} socialDistancingRulesetKey
     * @param {?object} objectCategories
     * @returns {Promise}
     */
    update (eventKey, chartKey = null, newEventKey = null, tableBookingConfig = null, socialDistancingRulesetKey = null, objectCategories = null) {
        const requestParameters = {}

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

        return this.client.post(`events/${encodeURIComponent(eventKey)}`, requestParameters)
    }

    /**
     * @param {string} eventKey
     * @returns {Promise}
     */
    delete (eventKey) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}`)
    }

    /**
     * @param {?object} requestParameters
     * @returns {AsyncIterator}
     */
    listAll (requestParameters = {}) {
        return this.iterator().all(requestParameters)
    }

    /**
     * @param {?number} pageSize
     * @returns {Page}
     */
    listFirstPage (pageSize = null) {
        return this.iterator().firstPage(null, pageSize)
    }

    /**
     * @param {?string} afterId
     * @param {?number} pageSize
     * @returns {Page}
     */
    listPageAfter (afterId, pageSize = null) {
        return this.iterator().pageAfter(afterId, null, pageSize)
    }

    /**
     * @param {?string} beforeId
     * @param {?number} pageSize
     * @returns {Page}
     */
    listPageBefore (beforeId, pageSize = null) {
        return this.iterator().pageBefore(beforeId, null, pageSize)
    }

    /**
     * @returns {Lister}
     */
    iterator () {
        return new Lister('/events', this.client, 'events', (data) => {
            const events = data.items.map(eventData => new EventDeserializer().fromJson(eventData))
            return new Page(events, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    /**
     * @param {string} eventKey
     * @returns {Lister}
     */
    statusChanges (eventKey) {
        return new Lister(`/events/${encodeURIComponent(eventKey)}/status-changes`, this.client, 'statusChanges', (data) => {
            const statusChanges = data.items.map(statusChangesData => new StatusChange(statusChangesData))
            return new Page(statusChanges, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    /**
     * @returns {Lister}
     */
    statusChangesForObject (eventKey, objectId = null) {
        return new Lister(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(objectId)}/status-changes`, this.client, 'statusChanges', (data) => {
            const statusChanges = data.items.map(statusChangesData => new StatusChange(statusChangesData))
            return new Page(statusChanges, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    /**
     * @param {string} eventKey
     * @param {?object} objects
     * @param {?string[]} categories
     * @returns {Promise}
     */
    markAsForSale (eventKey, objects = null, categories = null) {
        const requestParameters = {}
        if (objects !== null) {
            requestParameters.objects = objects
        }
        if (categories !== null) {
            requestParameters.categories = categories
        }
        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-as-for-sale`, requestParameters)
    }

    /**
     * @param {string} eventKey
     * @param {?object} objects
     * @param {?string[]} categories
     * @returns {Promise}
     */
    markAsNotForSale (eventKey, objects = null, categories = null) {
        const requestParameters = {}

        if (objects !== null) {
            requestParameters.objects = objects
        }

        if (categories !== null) {
            requestParameters.categories = categories
        }

        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-as-not-for-sale`, requestParameters)
    }

    /**
     * @param {string} eventKey
     * @returns {Promise}
     */
    markEverythingAsForSale (eventKey) {
        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-everything-as-for-sale`)
    }

    /**
     * @param {string} eventKey
     * @param {string} obj
     * @param {object} extraData
     * @returns {Promise}
     */
    updateExtraData (eventKey, obj, extraData) {
        const requestParameters = {}
        requestParameters.extraData = extraData
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(obj)}/actions/update-extra-data`, requestParameters)
    }

    /**
     * @param {string} eventKey
     * @param {object} extraData
     * @returns {Promise}
     */
    updateExtraDatas (eventKey, extraData) {
        const requestParameters = {}
        requestParameters.extraData = extraData
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/update-extra-data`, requestParameters)
    }

    /**
     * @param {string} eventKey
     * @param {string} label
     * @returns {Promise<EventObjectInfo>}
     */
    async retrieveObjectInfo (eventKey, label) {
        const result = await this.retrieveObjectInfos(eventKey, [label])
        return result[label]
    }

    /**
     * @param {string} eventKey
     * @param {string[]} labels
     * @returns {Promise<Map<String, EventObjectInfo>>}
     */
    retrieveObjectInfos (eventKey, labels) {
        const params = new URLSearchParams()
        labels.forEach(label => {
            params.append('label', label)
        })
        return this.client.get(`events/${encodeURIComponent(eventKey)}/objects`, { params })
            .then((res) => {
                const objectInfos = res.data
                for (const key of Object.keys(objectInfos)) {
                    objectInfos[key] = new EventObjectInfo(objectInfos[key])
                }
                return objectInfos
            })
    }

    /**
     * @param {(string|string[])} eventKeyOrKeys
     * @param {object|object[]} objectOrObjects
     * @param {string} status
     * @param {?string} holdToken
     * @param {?string} orderId
     * @param {?boolean} keepExtraData
     * @param {?boolean} ignoreChannels
     * @param {?string[]} channelKeys
     * @param {?boolean} ignoreSocialDistancing
     * @returns {Promise<ChangeObjectStatusResult>}
     * @param {?string[]} allowedPreviousStatuses
     * @param {?string[]} rejectedPreviousStatuses
     */
    changeObjectStatus (eventKeyOrKeys, objectOrObjects, status, holdToken = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null, ignoreSocialDistancing = null, allowedPreviousStatuses = null, rejectedPreviousStatuses = null) {
        const request = this.changeObjectStatusRequest(objectOrObjects, status, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, ignoreSocialDistancing, allowedPreviousStatuses, rejectedPreviousStatuses)
        request.events = Array.isArray(eventKeyOrKeys) ? eventKeyOrKeys : [eventKeyOrKeys]

        return this.client.post('/events/groups/actions/change-object-status?expand=objects', request)
            .then((res) => new ChangeObjectStatusResult(res.data.objects))
    }

    /**
     * @param {StatusChangeRequest[]} statusChangeRequests
     * @returns {Promise<ChangeObjectStatusResult[]>}
     */
    changeObjectStatusInBatch (statusChangeRequests) {
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
            .then((res) => res.data.results.map(r => new ChangeObjectStatusResult(r.objects)))
    }

    changeObjectStatusRequest (objectOrObjects, status, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, ignoreSocialDistancing, allowedPreviousStatuses, rejectedPreviousStatuses) {
        const request = {}
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

    /**
     * @param {(string|string[])} eventKeyOrKeys
     * @param {object|object[]} objectOrObjects
     * @param {?string} holdToken
     * @param {?string} orderId
     * @param {?boolean} keepExtraData
     * @param {?boolean} ignoreChannels
     * @param {?string[]} channelKeys
     * @param {?boolean} ignoreSocialDistancing
     * @returns {Promise<ChangeObjectStatusResult>}
     */
    book (eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null, ignoreSocialDistancing = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, EventObjectInfo.BOOKED, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, ignoreSocialDistancing)
    }

    /**
     * @param {string} eventKey
     * @param {number} number
     * @param {?string[]} categories
     * @param {?string} holdToken
     * @param {?object} extraData
     * @param {?string[]} ticketTypes
     * @param {?string} orderId
     * @param {?boolean} keepExtraData
     * @param {?boolean} ignoreChannels
     * @param {?string[]} channelKeys
     * @returns {Promise<BestAvailableObjects>}
     */
    bookBestAvailable (eventKey, number, categories = null, holdToken = null, extraData = null, ticketTypes = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null) {
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, EventObjectInfo.BOOKED, categories, holdToken, extraData, ticketTypes, orderId, keepExtraData, ignoreChannels, channelKeys)
    }

    /**
     * @param {(string|string[])} eventKeyOrKeys
     * @param {(object|object[])} objectOrObjects
     * @param {?string} holdToken
     * @param {?string} orderId
     * @param {?boolean} keepExtraData
     * @param {?boolean} ignoreChannels
     * @param {?string[]} channelKeys
     * @returns {Promise<ChangeObjectStatusResult>}
     */
    release (eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, EventObjectInfo.FREE, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys)
    }

    /**
     * @param {(string|string[])} eventKeyOrKeys
     * @param {(object|object[])} objectOrObjects
     * @param {string} holdToken
     * @param {?string} orderId
     * @param {?boolean} keepExtraData
     * @param {?boolean} ignoreChannels
     * @param {?string[]} channelKeys
     * @param {?boolean} ignoreSocialDistancing
     * @returns {Promise<ChangeObjectStatusResult>}
     */
    hold (eventKeyOrKeys, objectOrObjects, holdToken, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null, ignoreSocialDistancing = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, EventObjectInfo.HELD, holdToken, orderId, keepExtraData, ignoreChannels, channelKeys, ignoreSocialDistancing)
    }

    /**
     * @param {string} eventKey
     * @param {number} number
     * @param {string} holdToken
     * @param {?string[]} categories
     * @param {?object} extraData
     * @param {?string[]} ticketTypes
     * @param {?string} orderId
     * @param {?boolean} keepExtraData
     * @param {?boolean} ignoreChannels
     * @param {?string[]} channelKeys
     * @param {?string[]} ticketTypes
     * @returns {Promise<BestAvailableObjects>}
     */
    holdBestAvailable (eventKey, number, holdToken, categories = null, extraData = null, ticketTypes = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null) {
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, EventObjectInfo.HELD, categories, holdToken, extraData, ticketTypes, orderId, keepExtraData, ignoreChannels, channelKeys)
    }

    /**
     * @param {string} eventKey
     * @param {number} number
     * @param {string} status
     * @param {string[]} categories
     * @param {?string} holdToken
     * @param {?object} extraData
     * @param {?string[]} ticketTypes
     * @param {?string} orderId
     * @param {?boolean} keepExtraData
     * @param {?boolean} ignoreChannels
     * @param {?string[]} channelKeys
     * @returns {Promise<BestAvailableObjects>}
     */
    changeBestAvailableObjectStatus (eventKey, number, status, categories = null, holdToken = null, extraData = null, ticketTypes = null, orderId = null, keepExtraData = null, ignoreChannels = null, channelKeys = null) {
        const requestParameters = {}
        const bestAvailable = {}
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
            .then((res) => new BestAvailableObjects(res.data))
    }

    normalizeObjects (objectOrObjects) {
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

module.exports = Events
