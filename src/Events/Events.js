class Events{
  constructor(client){
    this.client = client;
  }

  create(chartKey, eventKey = null, bookWholeTables = null){
    var requestParams = {};
    requestParams.chartKey = chartKey;

    if(eventKey !== null){
      requestParams.eventKey = eventKey;
    }

    if(bookWholeTables !== null){
      requestParams.bookWholeTables = bookWholeTables;
    }

    return this.client.post(`events`, requestParams).then( (res) => res.data);
  }
}

module.exports = Events;
