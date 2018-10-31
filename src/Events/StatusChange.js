class StatusChange{
  constructor(id, eventId, status, quantity, objectLabel, date, orderId, extraData ){
    this.id = id;
    this.eventId = eventId;
    this.status = status;
    this.quantity = quantity;
    this.objectLabel = objectLabel;
    this.date = date;
    if(orderId){
      this.orderId = orderId;
    }
    if(extraData){
      this.extraData = extraData;
    }

  }
}

module.exports = StatusChange;
