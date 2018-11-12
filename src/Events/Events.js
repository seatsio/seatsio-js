const AsyncIterator = require('../AsyncIterator.js');
const Page = require('../Page.js');
const Lister = require('../Lister.js');
const PageFetcher = require('../PageFetcher.js');
const ObjectStatus = require('./ObjectStatus.js');
const utilities = require('../utilities.js');

class Events {
    constructor(client) {
        this.client = client;
    }

    /* @return Event */
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

    /* @return Event */
    retrieve(eventKey) {
        return this.client.get(`/events/${encodeURIComponent(eventKey)}`)
            .then((res) => utilities.createEvent(res.data));
    }

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

    delete(eventKey) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}`);
    }

    /* @return AsyncIterator */
    listAll(requestParameters = {}) {
        return new AsyncIterator('/events', this.client, 'events', requestParameters);
    }

    /* @return Page */
    listFirstPage(pageSize = null) {
        return this.iterator().firstPage(pageSize);
    }

    /* @return Page */
    listPageAfter(afterId, pageSize = null) {
        return this.iterator().pageAfter(afterId, null, pageSize);
    }

    /* @return Page */
    listPageBefore(beforeId, pageSize = null) {
        return this.iterator().pageBefore(beforeId, null, pageSize);
    }

    /* @return Lister */
    iterator(){
        return new Lister(new PageFetcher('/events', this.client, results => {
            let events = utilities.createMultipleEvents(results.items);
            return new Page(events);
        }));
    }

    /* @return AsyncIterator */
    statusChanges(eventKey, objectId = null) {
        if (objectId === null) {
            return new AsyncIterator(`/events/${encodeURIComponent(eventKey)}/status-changes`, this.client, 'statusChanges');
        }
        return new AsyncIterator(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(objectId)}/status-changes`, this.client, 'statusChanges');
    }

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

    markEverythingAsForSale(eventKey) {
        return this.client.post(`events/${encodeURIComponent(eventKey)}/actions/mark-everything-as-for-sale`);
    }

    updateExtraData(eventKey, obj, extraData) {
        let requestParameters = {};
        requestParameters.extraData = extraData;
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(obj)}/actions/update-extra-data`, requestParameters);
    }

    updateExtraDatas(eventKey, extraData) {
        let requestParameters = {};
        requestParameters.extraData = extraData;
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/update-extra-data`, requestParameters);
    }

    /* @return ObjectStatus */
    retrieveObjectStatus(eventKey, obj) {
        return this.client.get(`events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(obj)}`)
            .then((res) => utilities.createObjectStatus(res.data));
    }

    /* @return ChangeObjectStatusResult */
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

        return this.client.post(`/seasons/actions/change-object-status?expand=labels`, requestParameters)
            .then((res) => utilities.createChangeObjectStatusResult(res.data));
    }

    /* @return ChangeObjectStatusResult */
    book(eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, objectStatus.BOOKED, holdToken, orderId);
    }

    /* @return BestAvailableObjects */
    bookBestAvailable(eventKey, number, categories = null, holdToken = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, objectStatus.BOOKED, categories, holdToken, orderId);
    }

    /* @return ChangeObjectStatusResult */
    release(eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, objectStatus.FREE, holdToken, orderId);
    }

    /* @return ChangeObjectStatusResult */
    hold(eventKeyOrKeys, objectOrObjects, holdToken, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, objectStatus.HELD, holdToken, orderId);
    }

    /* @return BestAvailableObjects */
    holdBestAvailable(eventKey, number, holdToken, categories = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, objectStatus.HELD, categories, holdToken, orderId);
    }

    /* @return BestAvailableObjects */
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
