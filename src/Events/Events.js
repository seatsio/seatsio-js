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
}

module.exports = Events;
