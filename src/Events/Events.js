const StatusChange = require('./StatusChange.js');
const Event = require('./Event.js');
const PageFetcher = require('../PageFetcher.js');
const Page = require('../Page.js');
const ObjectStatus = require('./ObjectStatus.js');
const Lister = require('./Lister.js');
const IterableEventPages = require('./IterableEventPages.js');

class Events{
  constructor(client){
    this.client = client;
  }

  create(chartKey, eventKey = null, bookWholeTablesOrTableBookingModes = null){
    var requestParams = {};

    requestParams.chartKey = chartKey;

    if(eventKey !== null){
      requestParams.eventKey = eventKey;
    }

    if((bookWholeTablesOrTableBookingModes === true) || (bookWholeTablesOrTableBookingModes === false)){
      requestParams.bookWholeTables = bookWholeTablesOrTableBookingModes;
    } else if (bookWholeTablesOrTableBookingModes) {
      requestParams.tableBookingModes = bookWholeTablesOrTableBookingModes;
    }

    return this.client.post(`/events`, requestParams).then( (res) => res.data).catch( (err) => console.log(err));
  }

  retrieve(eventKey){
    return this.client.get(`/events/${eventKey}`)
                      .then( (res) => res.data);
  }

  retrieveObjectStatus(eventKey, obj){
    return this.client.get(`events/${eventKey}/objects/${obj}`)
                      .then( (res) => res.data);
  }

  changeObjectStatus(eventKeyOrKeys, objectOrObjects, status, holdToken = null, orderId = null){
    var request = {};

    //request.objects = Array.isArray(objectOrObjects) ? objectOrObjects : [objectOrObjects];
    request.objects = this.normalizeObjects(objectOrObjects);

    request.status = status;

    if(holdToken !== null){
      request.holdToken = holdToken;
    }

    if(orderId !== null){
      request.orderId = orderId;
    }

    request.events = Array.isArray(eventKeyOrKeys) ? eventKeyOrKeys : [eventKeyOrKeys];

    return this.client.post(`/seasons/actions/change-object-status?expand=labels`, request)
                      .then( (res) => res.data);
  }

  hold(eventKeyOrKeys, objectOrObjects, holdToken, orderId = null){
    return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, ObjectStatus.HELD, holdToken, orderId);
  }

  holdBestAvailable(eventKey, number, holdToken, categories = null, orderId = null)
   {
       return this.changeBestAvailableObjectStatus(eventKey, number, ObjectStatus.HELD, categories, holdToken, orderId);
   }

  book(eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null){
    return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, ObjectStatus.BOOKED, holdToken, orderId);
  }

  bookBestAvailable(eventKey, number, categories = null, holdToken = null, orderId = null){
    return this.changeBestAvailableObjectStatus(eventKey, number, ObjectStatus.BOOKED, categories, holdToken, orderId);
  }

  release(eventKeyOrKeys, objectOrObjects, holdToken = null, orderId = null)
    {
        return this.changeObjectStatus(eventKeyOrKeys, objectOrObjects, ObjectStatus.FREE, holdToken, orderId);
    }

  delete(eventKey){
    return this.client.delete(`/events/${eventKey}`).then( (res) => res.data);
  }

  markAsForSale(eventKey, objects = null, categories = null){
    var requestParams = {};
    if(objects !== null){
      requestParams.objects = objects;
    }
    if(categories !== null){
      requestParams.categories = categories;
    }
    return this.client.post(`events/${eventKey}/actions/mark-as-for-sale`, requestParams);
  }

  markAsNotForSale(eventKey, objects = null, categories = null){
    var request = {};

    if(objects !== null){
      request.objects = objects;
    }

    if(categories !== null){
      request.categories = categories;
    }

    return this.client.post(`events/${eventKey}/actions/mark-as-not-for-sale`, request);
  }

  markEverythingAsForSale(eventKey){
    return this.client.post(`events/${eventKey}/actions/mark-everything-as-for-sale`);
  }

  update(eventKey, chartKey = null, newEventKey = null, bookWholeTablesOrTableBookingModes = null){
    var requestParams = {};

    if(chartKey !== null){
      requestParams.chartKey = chartKey;
    }

    if(newEventKey !== null){
      requestParams.eventKey = newEventKey;
    }

    if(typeof bookWholeTablesOrTableBookingModes === 'boolean'){
      requestParams.bookWholeTables = bookWholeTablesOrTableBookingModes;
    } else if(bookWholeTablesOrTableBookingModes !== null){
      requestParams.tableBookingModes = bookWholeTablesOrTableBookingModes;
    }

    return this.client.post(`events/${eventKey}`, requestParams);
  }

  updateExtraDatas(eventKey, extraDatas){
    var request = {};
    request.extraData = extraDatas;
    return this.client.post(`/events/${eventKey}/actions/update-extra-data`, request);
  }

  updateExtraData(eventKey, obj, extraData){
    var request = {};
    request.extraData = extraData;
    return this.client.post(`/events/${eventKey}/objects/${obj}/actions/update-extra-data`, request);
  }

  changeBestAvailableObjectStatus(eventKey, number, status, categories = null, holdToken = null, extraData = null, orderId = null){
    var requestParams = {};
    var bestAvailable = {};
    bestAvailable.number= number;

    if(categories !== null){
      bestAvailable.categories = categories;
    }

    if(extraData !== null){
      bestAvailable.extraData = extraData;
    }

    requestParams.bestAvailable = bestAvailable;
    requestParams.status = status;
    if(holdToken !== null){
      requestParams.holdToken = holdToken;
    }

    if(orderId !== null){
      requestParams.orderId = orderId;
    }

    return this.client.post(`/events/${eventKey}/actions/change-object-status`, requestParams)
                      .then( (res) => res.data);
  }

  normalizeObjects(objectOrObjects){
    if(Array.isArray(objectOrObjects)){
      if(objectOrObjects.length === 0){
        return [];
      }
      return objectOrObjects.map( (obj) => {
        if(typeof obj === "object"){
          return obj;
        }
        if(typeof obj === "string"){
          return {"objectId" : obj};
        }
        return obj;
      });
    }
    return this.normalizeObjects([objectOrObjects]);
  }

  getAll(){
    return new IterableEventPages('/events', this.client);
  }

  statusChanges(eventKey, objectId = null){
       if(objectId === null) {
           return new Lister(new PageFetcher(`/events/${eventKey}/status-changes`, this.client, (results) => {
             var statusItems = results.items.map((statusData) => {
               return new StatusChange(statusData.id, statusData.eventId, statusData.status,
                                                    statusData.quantity, statusData.objectLabel,
                                          statusData.date, statusData.orderId, statusData.extraData);
             });
             return new Page(statusItems);
           }));
       }

       return new Lister(new PageFetcher(`/events/${eventKey}/objects/${objectId}/status-changes`, this.client, (results) => {
         var statusItems = results.items.map((statusData) => {
           return new StatusChange(statusData.id, statusData.eventId, statusData.status,
                                                statusData.quantity, statusData.objectLabel,
                                      statusData.date, statusData.orderId, statusData.extraData);
         });
         return new Page(statusItems);
       }));
   }

  iterator(){
    return new Lister(new PageFetcher('/events', this.client, (results) => {
      var eventItems = results.items.map((eventData) => {
        return new Event(eventData.id, eventData.key, eventData.bookWholeTables,
                            eventData.supportsBestAvailable, eventData.forSaleConfig,
                              eventData.chartKey, eventData.createdOn, eventData.updatedOn);
      });
      return new Page(eventItems);
    }))
  }
}

module.exports = Events;
