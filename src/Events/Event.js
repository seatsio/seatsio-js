class Event{
  constructor(id, key, bookWholeTables, supportsBestAvailable, forSaleConfig, chartKey, createdOn, updatedOn){
    this.id = id;
    this.key = key;
    this.bookWholeTables = bookWholeTables;
    this.supportsBestAvailable = supportsBestAvailable;
    this.forSaleConfig = forSaleConfig;
    this.chartKey = chartKey;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }
}

module.exports = Event;
