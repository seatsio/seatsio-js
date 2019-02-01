const AsyncIterator = require('../AsyncIterator.js');
const Page = require('../Page.js');
const Lister = require('../Lister.js');
const PageFetcher = require('../PageFetcher.js');
const ObjectStatus = require('./ObjectStatus.js');
const utilities = require('../utilities.js');

class Events {
    /**
     * @param {SeatsioClient} client
     */
    constructor(client) {
        this.client = client;
    }

    /* @return Event */
    /**
     * @param {string} chartKey
     * @param {?string} eventKey
     * @param {?object} bookWholeTablesOrTableBookingModes
     * @returns {Promise<Event>} Promise that resolves to Event object
     */
    create(chartKey, eventKey = null, bookWholeTablesOrTableBookingModes = null) {
        let requestParameters = {};

        requestParameters.chartKey = chartKey;

        if (eventKey !== null) {
            requestParameters.eventKey = encodeURIComponent(eventKey);
        }

        if ((bookWholeTablesOrTableBookingModes === true) || (bookWholeTablesOrTableBookingModes === false)) {
            requestParameters.bookWholeTables = bookWholeTablesOrTableBookingModes;
        } else if (bookWholeTablesOrTableBookingModes) {
            requestParameters.tableBookingModes = bookWholeTablesOrTableBookingModes;
        }

        return this.client.post(`/events`, requestParameters)
            .then((res) => utilities.createEvent(res.data));
    }

    /**
     * @param {string} eventKey
     * @returns {Promise<Event>} Promise that resolves to Event object
     */
    retrieve(eventKey) {
        return this.client.get(`/events/${encodeURIComponent(eventKey)}`)
            .then((res) => utilities.createEvent(res.data));
    }

    /**
     * @param {string} eventKey
     * @param {?string} chartKey
     * @param {?string} newEventKey
     * @param {?object} bookWholeTablesOrTableBookingModes
     * @returns {Promise}
     */
    update(eventKey, chartKey = null, newEventKey = null, bookWholeTablesOrTableBookingModes = null) {
        let requestParameters = {};

        if (chartKey !== null) {
            requestParameters.chartKey = chartKey;
        }

        if (newEventKey !== null) {
            requestParameters.eventKey = encodeURIComponent(newEventKey);
        }

        if (typeof bookWholeTablesOrTableBookingModes === 'boolean') {
            requestParameters.bookWholeTables = bookWholeTablesOrTableBookingModes;
        } else if (bookWholeTablesOrTableBookingModes !== null) {
            requestParameters.tableBookingModes = bookWholeTablesOrTableBookingModes;
        }

        return this.client.post(`events/${encodeURIComponent(eventKey)}`, requestParameters);
    }

    /**
     * @param {string} eventKey
     * @returns {Promise}
     */
    delete(eventKey) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}`);
    }

    /**
     * @param {?object} requestParameters
     * @returns {AsyncIterator}
     */
    listAll(requestParameters = {}) {
        return new AsyncIterator('/events', this.client, 'events', requestParameters);
    }

    /**
     * @param {?number} pageSize
     * @returns {Page}
     */
    listFirstPage(pageSize = null) {
        return this.iterator().firstPage(null, pageSize);
    }

    /**
     * @param {?string} afterId
     * @param {?number} pageSize
     * @returns {Page}
     */
    listPageAfter(afterId, pageSize = null) {
        return this.iterator().pageAfter(afterId, null, pageSize);
    }

    /**
     * @param {?string} beforeId
     * @param {?number} pageSize
     * @returns {Page}
     */
    listPageBefore(beforeId, pageSize = null) {
        return this.iterator().pageBefore(beforeId, null, pageSize);
    }

    /**
     * @returns {Lister}
     */
    iterator() {
        return new Lister(new PageFetcher('/events', this.client, results => {
            let events = utilities.createMultipleEvents(results.items);
            let after_id = results.next_page_starts_after ? results.next_page_starts_after : null;
            let before_id = results.previous_page_ends_before ? results.previous_page_ends_before : null;
            return new Page(events, after_id, before_id);
        }));
    }

    /**
     * @param {string} eventKey
     * @param {?string} objectId
     * @param {?object} params
     * @returns {AsyncIterator}
     */
    statusChanges(eventKey, objectId = null, params = {}) {
        if (objectId === null) {
            return new AsyncIterator(`/events/${encodeURIComponent(eventKey)}/status-changes`, this.client, 'statusChanges', params);
        }
        return new AsyncIterator(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(objectId)}/status-changes`, this.client, 'statusChanges', params);
    }

    /**
     * @param {string} eventKey
     * @param {StatusChangesParams} statusChangesParams
     * @param {?number} pageSize
     * @returns {Page}
     */
    listStatusChangesFirstPage(eventKey, statusChangesParams = null, pageSize = null) {
        return this.statusChangeIterator(eventKey).firstPage(statusChangesParams, pageSize);
    }

    /**
     * @param {string} eventKey
     * @param {StatusChangesParams} statusChangesParams
     * @param {?string} afterId
     * @param {?number} pageSize
     * @returns {Page}
     */
    listStatusChangesPageAfter(eventKey, afterId, statusChangesParams = null, pageSize = null) {
        return this.statusChangeIterator(eventKey).pageAfter(afterId, statusChangesParams, pageSize);
    }

    /**
     * @param {string} eventKey
     * @param {?string} beforeId
     * @param {StatusChangesParams} statusChangesParams
     * @param {?number} pageSize
     * @returns {Page}
     */
    listStatusChangesPageBefore(eventKey, beforeId, statusChangesParams = null,  pageSize = null) {
        return this.statusChangeIterator(eventKey).pageBefore(beforeId, statusChangesParams, pageSize);
    }

    /**
     * @returns {Lister}
     */
    statusChangeIterator(eventKey) {
        return new Lister(new PageFetcher(`/events/${encodeURIComponent(eventKey)}/status-changes`, this.client, results => {
            let statusChanges= utilities.createMultipleStatusChanges(results.items);
            let after_id = results.next_page_starts_after ? results.next_page_starts_after : null;
            let before_id = results.previous_page_ends_before ? results.previous_page_ends_before : null;
            return new Page(statusChanges, after_id, before_id);
        }));
    }

    /**
     * @param {string} eventKey
     * @param {?object} objects
     * @param {?string[]} categories
     * @returns {Promise}
     */
    markAsForSale(eventKey, objects = null, categories = null) {
        let requestParameters = {};
        if (objects !== null) {
            requestParameters.objects = objects;
        }
        if (categories !== null) {
            requestParameters.categories = categories;
        }
        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-as-for-sale`, requestParameters);
    }

    /**
     * @param {string} eventKey
     * @param {?object} objects
     * @param {?string[]} categories
     * @returns {Promise}
     */
    markAsNotForSale(eventKey, objects = null, categories = null) {
        let requestParameters = {};

        if (objects !== null) {
            requestParameters.objects = objects;
        }

        if (categories !== null) {
            requestParameters.categories = categories;
        }

        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-as-not-for-sale`, requestParameters);
    }

    /**
     * @param {string} eventKey
     * @returns {Promise}
     */
    markEverythingAsForSale(eventKey) {
        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-everything-as-for-sale`);
    }

    /**
     * @param {string} eventKey
     * @param {string} obj
     * @param {object} extraData
     * @returns {Promise}
     */
    updateExtraData(eventKey, obj, extraData) {
        let requestParameters = {};
        requestParameters.extraData = extraData;
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(obj)}/actions/update-extra-data`, requestParameters);
    }

    /**
     * @param {string} eventKey
     * @param {object} extraData
     * @returns {Promise}
     */
    updateExtraDatas(eventKey, extraData) {
        let requestParameters = {};
        requestParameters.extraData = extraData;
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/update-extra-data`, requestParameters);
    }

    /**
     * @param {string} eventKey
     * @param {string} obj
     * @returns {Promise<ObjectStatus>} Promise that resolves to ObjectStatus object
     */
    retrieveObjectStatus(eventKey, obj) {
        return this.client.get(`events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(obj)}`)
            .then((res) => utilities.createObjectStatus(res.data));
    }

    /**
     * @param {(string|string[])} eventKeyOrKeys
     * @param {object|object[]} objectOrObjects
     * @param {string} status
     * @param {?string} holdToken
     * @param {?string} orderId
     * @returns {Promise<ChangeObjectStatusResult>} Promise that resolves to ChangeObjectStatusResult object
     */
    changeObjectStatus(eventKeyOrKeys, objectOrObjects, status, holdToken = null, orderId = null) {
        let requestParameters = {};

        requestParameters.objects = this.normalizeObjects(objectOrObjects);

        requestParameters.status = status;

        if (holdToken !== null) {
            requestParameters.holdToken = holdToken;
        }

        if (orderId !== null) {
            requestParameters.orderId = orderId;
        }

        requestParameters.events = Array.isArray(eventKeyOrKeys) ? eventKeyOrKeys : [eventKeyOrKeys];

        return this.client.post(`/seasons/actions/change-object-status?expand=objects`, requestParameters)
            .then((res) => utilities.createChangeObjectStatusResult(res.data));
    }

    /**
     * @param {(string|string[])} eventKeyOrKeys
     * @param {object|object[]} objectOrObjects
     * @param {?string} holdToken
     * @param {?string} orderId
     * @returns {Promise<ChangeObjectStatusResult>} Promise that resolves to ChangeObjectStatusResult object
     */
    book(eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, objectStatus.BOOKED, holdToken, orderId);
    }

    /**
     * @param {string} eventKey
     * @param {number} number
     * @param {?string[]} categories
     * @param {?string} holdToken
     * @param {?string} orderId
     * @returns {Promise<BestAvailableObjects>} Promise that resolves to BestAvailableObjects object
     */
    bookBestAvailable(eventKey, number, categories = null, holdToken = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, objectStatus.BOOKED, categories, holdToken, orderId);
    }

    /**
     * @param {(string|string[])} eventKeyOrKeys
     * @param {(object|object[])} objectOrObjects
     * @param {?string} holdToken
     * @param {?string} orderId
     * @returns {Promise<ChangeObjectStatusResult>} Promise that resolves to ChangeObjectStatusResult object
     */
    release(eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, objectStatus.FREE, holdToken, orderId);
    }

    /**
     * @param {(string|string[])} eventKeyOrKeys
     * @param {(object|object[])} objectOrObjects
     * @param {string} holdToken
     * @param {?string} orderId
     * @returns {Promise<ChangeObjectStatusResult>} Promise that resolves to ChangeObjectStatusResult object
     */
    hold(eventKeyOrKeys, objectOrObjects, holdToken, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, objectStatus.HELD, holdToken, orderId);
    }

    /**
     * @param {string} eventKey
     * @param {number} number
     * @param {string} holdToken
     * @param {?string[]} categories
     * @param {?string} orderId
     * @returns {Promise<BestAvailableObjects>} Promise that resolves to BestAvailableObjects object
     */
    holdBestAvailable(eventKey, number, holdToken, categories = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, objectStatus.HELD, categories, holdToken, orderId);
    }

    /**
     * @param {string} eventKey
     * @param {number} number
     * @param {string} status
     * @param {string[]} categories
     * @param {?string} holdToken
     * @param {?object} extraData
     * @param {?string} orderId
     * @returns {Promise<BestAvailableObjects>} Promise that resolves to BestAvailableObjects object
     */
    changeBestAvailableObjectStatus(eventKey, number, status, categories = null, holdToken = null, extraData = null, orderId = null) {
        let requestParameters = {};
        let bestAvailable = {};
        requestParameters.status = status;
        bestAvailable.number = number;
        if (holdToken !== null) {
            requestParameters.holdToken = holdToken;
        }
        if (orderId !== null) {
            requestParameters.orderId = orderId;
        }
        if (categories !== null) {
            bestAvailable.categories = categories;
        }

        if (extraData !== null) {
            bestAvailable.extraData = extraData;
        }
        requestParameters.bestAvailable = bestAvailable;

        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/change-object-status`, requestParameters)
            .then((res) => utilities.createBestAvailableObjects(res.data));
    }

    normalizeObjects(objectOrObjects) {
        if (Array.isArray(objectOrObjects)) {
            if (objectOrObjects.length === 0) {
                return [];
            }
            return objectOrObjects.map((obj) => {
                if (typeof obj === "object") {
                    return obj;
                }
                if (typeof obj === "string") {
                    return {"objectId": obj};
                }
                return obj;
            });
        }
        return this.normalizeObjects([objectOrObjects]);
    }
}

module.exports = Events;
