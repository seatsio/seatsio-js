class Event {
    constructor(id, key, bookWholeTables, supportsBestAvailable, forSaleConfig, tableBookingModes, chartKey, createdOn, updatedOn) {
        /* int */
        this.id = id;
        /* string */
        this.key = key;
        /* boolean */
        this.bookWholeTables = bookWholeTables;
        /* boolean */
        this.supportsBestAvailable = supportsBestAvailable;
        /* Events/ForSaleConfig */
        this.forSaleConfig = forSaleConfig;
        /* object */
        this.tableBookingModes = tableBookingModes;
        /* string */
        this.chartKey = chartKey;
        /* Date */
        this.createdOn = createdOn;
        /* Date */
        this.updatedOn = updatedOn;
    }
}

module.exports = Event;
