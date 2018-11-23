class Event {
    /**
     * @param {number} id
     * @param {string} key
     * @param {boolean} bookWholeTables
     * @param {boolean} supportsBestAvailable
     * @param {ForSaleConfig} forSaleConfig
     * @param {Object} tableBookingModes
     * @param {string} chartKey
     * @param {Date} createdOn
     * @param {Date} updatedOn
     */
    constructor(id, key, bookWholeTables, supportsBestAvailable, forSaleConfig, tableBookingModes, chartKey, createdOn, updatedOn) {
        this.id = id;
        this.key = key;
        this.bookWholeTables = bookWholeTables;
        this.supportsBestAvailable = supportsBestAvailable;
        this.forSaleConfig = forSaleConfig;
        this.tableBookingModes = tableBookingModes;
        this.chartKey = chartKey;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
    }
}

module.exports = Event;
