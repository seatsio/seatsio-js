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

    return this.client.post(`/events`, requestParams).then( (res) => res.data)
                                                     .catch( (err) => console.log(err));
  }

  retrieve(eventKey){
    return this.client.get(`/events/${eventKey}`)
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
}

module.exports = Events;
