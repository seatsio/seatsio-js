const StatusChange = require('./StatusChange.js');
const PageFetcher = require('../PageFetcher.js');
const Page = require('../Page.js');
const Lister = require('./Lister.js');
const IterableEventPages = require('./IterableEventPages.js');
const Event = require('./Event.js');
const IterableAsyncEvents = require('./IterableAsyncEvents.js');
const ObjectStatus = require('./ObjectStatus.js');

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
            requestParameters.eventKey = eventKey;
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
        return this.client.get(`/events/${eventKey}`)
            .then((res) => Events.eventCreator(res.data));
    }

    retrieveObjectStatus(eventKey, obj) {
        return this.client.get(`events/${eventKey}/objects/${obj}`)
            .then((res) => res.data);
    }

    hold(eventKeyOrKeys, objectOrObjects, holdToken, orderId = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, ObjectStatus.HELD, holdToken, orderId);
    }

    holdBestAvailable(eventKey, number, holdToken, categories = null, orderId = null) {
        return this.changeBestAvailableObjectStatus(eventKey, number, ObjectStatus.HELD, categories, holdToken, orderId);
    }

    book(eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, ObjectStatus.BOOKED, holdToken, orderId);
    }

    bookBestAvailable(eventKey, number, categories = null, holdToken = null, orderId = null) {
        return this.changeBestAvailableObjectStatus(eventKey, number, ObjectStatus.BOOKED, categories, holdToken, orderId);
    }

    release(eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null) {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, ObjectStatus.FREE, holdToken, orderId);
    }

    delete(eventKey) {
        return this.client.delete(`/events/${eventKey}`);
    }

    markAsForSale(eventKey, objects = null, categories = null) {
        let requestParameters = {};
        if (objects !== null) {
            requestParameters.objects = objects;
        }
        if (categories !== null) {
            requestParameters.categories = categories;
        }
        return this.client.post(`events/${eventKey}/actions/mark-as-for-sale`, requestParameters);
    }

    markAsNotForSale(eventKey, objects = null, categories = null) {
        let requestParameters = {};

        if (objects !== null) {
            requestParameters.objects = objects;
        }

        if (categories !== null) {
            requestParameters.categories = categories;
        }

        return this.client.post(`events/${eventKey}/actions/mark-as-not-for-sale`, requestParameters);
    }

    markEverythingAsForSale(eventKey) {
        return this.client.post(`events/${eventKey}/actions/mark-everything-as-for-sale`);
    }

    update(eventKey, chartKey = null, newEventKey = null, bookWholeTablesOrTableBookingModes = null) {
        let requestParameters= {};

        if (chartKey !== null) {
            requestParameters.chartKey = chartKey;
        }

        if (newEventKey !== null) {
            requestParameters.eventKey = newEventKey;
        }

        if (typeof bookWholeTablesOrTableBookingModes === 'boolean') {
            requestParameters.bookWholeTables = bookWholeTablesOrTableBookingModes;
        } else if (bookWholeTablesOrTableBookingModes !== null) {
            requestParameters.tableBookingModes = bookWholeTablesOrTableBookingModes;
        }

        return this.client.post(`events/${eventKey}`, requestParameters);
    }

    updateExtraDatas(eventKey, extraData) {
        let requestParameters= {};
        requestParameters.extraData = extraData;
        return this.client.post(`/events/${eventKey}/actions/update-extra-data`, requestParameters);
    }

    updateExtraData(eventKey, obj, extraData) {
        let requestParameters = {};
        requestParameters.extraData = extraData;
        return this.client.post(`/events/${eventKey}/objects/${obj}/actions/update-extra-data`, requestParameters);
    }

    getAll() {
        return new IterableEventPages('/events', this.client);
    }

    listAll(){
        return new IterableAsyncEvents('/events', this.client);
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
            .then((res) => res.data);
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

        return this.client.post(`/events/${eventKey}/actions/change-object-status`, requestParameters)
            .then((res) => res.data);
    }

    statusChanges(eventKey, objectId = null) {
        if (objectId === null) {
            return new Lister(new PageFetcher(`/events/${eventKey}/status-changes`, this.client, (results) => {
                let statusItems = results.items.map((statusData) => {
                    return new StatusChange(statusData.id, statusData.eventId, statusData.status,
                        statusData.quantity, statusData.objectLabel,
                        statusData.date, statusData.orderId, statusData.extraData);
                });
                return new Page(statusItems);
            }));
        }

        return new Lister(new PageFetcher(`/events/${eventKey}/objects/${objectId}/status-changes`, this.client, (results) => {
            let statusItems = results.items.map((statusData) => {
                return new StatusChange(statusData.id, statusData.eventId, statusData.status,
                    statusData.quantity, statusData.objectLabel,
                    statusData.date, statusData.orderId, statusData.extraData);
            });
            return new Page(statusItems);
        }));
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
