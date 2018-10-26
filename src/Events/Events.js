const ObjectStatus = require('./ObjectStatus.js');

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
    if(objects){
      requestParams.objects = objects;
    }
    if(categories){
      requestParams.categories = categories;
    }
    return this.client.post(`events/${eventKey}/actions/mark-as-for-sale`, requestParams);
  }

  markEverythingAsForSale(eventKey){
    return this.client.post(`events/${eventKey}/actions/mark-everything-as-for-sale`);
  }

  update(eventKey, chartKey = null, newEventKey = null, bookWholeTablesOrTableBookingModes = null){
    var requestParams = {};

    if(chartKey){
      requestParams.chartKey = chartKey;
    }

    if(newEventKey){
      requestParams.eventKey = newEventKey;
    }
    if(typeof bookWholeTablesOrTableBookingModes === 'boolean'){
      requestParams.bookWholeTables = bookWholeTablesOrTableBookingModes;
    } else if(typeof bookWholeTablesOrTableBookingModes !== 'undefined' && bookWholeTablesOrTableBookingModes !== null){
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

    if(categories){
      bestAvailable.categories = categories;
    }

    if(extraData){
      bestAvailable.extraData = extraData;
    }

    requestParams.bestAvailable = bestAvailable;
    requestParams.status = status;
    if(holdToken){
      requestParams.holdToken = holdToken;
    }

    if(orderId){
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
}

module.exports = Events;
