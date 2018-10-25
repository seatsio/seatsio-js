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

    return this.client.post(`/events`, requestParams).then( (res) => res.data);
  }

  retrieve(eventKey){
    return this.client.get(`/events/${eventKey}`)
                      .then( (res) => res.data);
  }

  retrieveObjectStatus(eventKey, obj){
    return this.client.get(`events/${eventKey}/objects/${obj}`)
                      .then( (res) => res.data);
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

    return this.client.post(`events/${eventKey}`, requestParams).then( (res) => res.data);
  }

  updateExtraDatas(eventKey, extraDatas){
    var request = {};
    request.extraData = extraDatas;
    return this.client.post(`/events/${eventKey}/actions/update-extra-data`, request);
  }

  updateExtraData(eventKey, obj, extraData){
    request = {};
    request.extraData = extraData;
    return this.client.post(`/events/${eventKey}/objects/${obj}/actions/update-extra-data`, request);
  }
}

module.exports = Events;
