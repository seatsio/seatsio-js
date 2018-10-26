class ObjectProperties{
  constructor(objectId){
    this.objectId = objectId;
  }

  setTicketType(ticketType){
    this.ticketType = ticketType;
    return this;
  }

  setQuantity(quantity){
    this.quantity = quantity;
    return this;
  }

  setExtraData(extraData){
    this.extraData = extraData;
    return this;
  }
}

module.exports = ObjectProperties;
