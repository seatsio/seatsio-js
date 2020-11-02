class TableBookingConfig {
    /**
     * @param {string} mode
     * @param {object} tables
     */
    constructor (mode, tables) {
        this.mode = mode
        this.tables = tables
    }

    /**
     * @returns {TableBookingConfig}
     */
    static inherit () {
        return new TableBookingConfig('INHERIT')
    }

    /**
     * @returns {TableBookingConfig}
     */
    static allByTable () {
        return new TableBookingConfig('ALL_BY_TABLE')
    }

    /**
     * @returns {TableBookingConfig}
     */
    static allBySeat () {
        return new TableBookingConfig('ALL_BY_SEAT')
    }

    /**
     * @param {object} tables
     * @returns {TableBookingConfig}
     */
    static custom (tables) {
        return new TableBookingConfig('CUSTOM', tables)
    }
}

module.exports = TableBookingConfig
