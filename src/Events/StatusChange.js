class StatusChange{
  constructor(id, eventId, status, quantity, objectLabel, date, orderId, extraData ){
    this.id = id;
    this.eventId = eventId;
    this.status = status;
    this.quantity = quantity;
    this.objectLabel = objectLabel;
    this.date = date;
    if(orderId !== null){
      this.orderId = orderId;
    }
    if(extraData !== null){
      this.extraData = extraData;
    }

  }
}

module.exports = StatusChange;
