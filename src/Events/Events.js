const Event = require('./Event.js');
const AsyncIterator = require('../AsyncIterator.js');
const ObjectStatus = require('./ObjectStatus.js');
const ChangeObjectStatusResult = require('./ChangeObjectStatusResult.js');

class Events {
    constructor(client) {
        this.client = client;
    }

    static eventCreator(eventData) {
        let updatedOn = eventData.updatedOn ? new Date(eventData.updatedOn) : null;

        return new Event(eventData.id, eventData.key, eventData.bookWholeTables,
            eventData.supportsBestAvailable, eventData.forSaleConfig, eventData.tableBookingModes, eventData.chartKey,
            new Date(eventData.createdOn), updatedOn);
    }


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
            .then((res) => Events.eventCreator(res.data));
    }

    retrieve(eventKey) {
        return this.client.get(`/events/${encodeURIComponent(eventKey)}`)
            .then((res) => Events.eventCreator(res.data));
    }

    retrieveObjectStatus(eventKey, obj) {
        return this.client.get(`events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(obj)}`)
            .then((res) => Events.createObjectStatus(res.data));
    }

    hold(eventKeyOrKeys, objectOrObjects, holdToken, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, objectStatus.HELD, holdToken, orderId);
    }

    book(eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, objectStatus.BOOKED, holdToken, orderId);
    }

    release(eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, objectStatus.FREE, holdToken, orderId);
    }

    delete(eventKey) {
        return this.client.delete(`/events/${encodeURIComponent(eventKey)}`);
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

    update(eventKey, chartKey = null, newEventKey = null, bookWholeTablesOrTableBookingModes = null) {
        let requestParameters= {};

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

    updateExtraDatas(eventKey, extraData) {
        let requestParameters= {};
        requestParameters.extraData = extraData;
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/actions/update-extra-data`, requestParameters);
    }

    updateExtraData(eventKey, obj, extraData) {
        let requestParameters = {};
        requestParameters.extraData = extraData;
        return this.client.post(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(obj)}/actions/update-extra-data`, requestParameters);
    }

    listAll(requestParameters = {}) {
        return new AsyncIterator('/events', this.client, 'events', requestParameters);
    }

    changeObjectStatus(eventKeyOrKeys, objectOrObjects, status, holdToken = null, orderId = null) {
        let requestParameters= {};

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
            .then((res) => new ChangeObjectStatusResult(res.data.labels));
    }

    holdBestAvailable(eventKey, number, holdToken, categories = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, objectStatus.HELD, categories, holdToken, orderId);
    }

    bookBestAvailable(eventKey, number, categories = null, holdToken = null, orderId = null) {
        let objectStatus = new ObjectStatus();
        return this.changeBestAvailableObjectStatus(encodeURIComponent(eventKey), number, objectStatus.BOOKED, categories, holdToken, orderId);
    }

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
            .then((res) => res.data);
    }

    static createObjectStatus(data){
        return new ObjectStatus(data.status, data.ticketType, data.holdToken, data.orderId, data.extraData, data.quantity);
    }

    statusChanges(eventKey, objectId = null) {
        if (objectId === null) {
            return new AsyncIterator(`/events/${encodeURIComponent(eventKey)}/status-changes`, this.client, 'statusChanges');
        }
        return new AsyncIterator(`/events/${encodeURIComponent(eventKey)}/objects/${encodeURIComponent(objectId)}/status-changes`, this.client, 'statusChanges');
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
