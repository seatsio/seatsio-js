export class TableBookingConfig {
    mode: any
    tables: any
    /**
     * @param {string} mode
     * @param {object} tables
     */
    constructor (mode: any, tables: any) {
        this.mode = mode
        this.tables = tables
    }

    /**
     * @returns {TableBookingConfig}
     */
    static inherit () {
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        return new TableBookingConfig('INHERIT')
    }

    /**
     * @returns {TableBookingConfig}
     */
    static allByTable () {
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        return new TableBookingConfig('ALL_BY_TABLE')
    }

    /**
     * @returns {TableBookingConfig}
     */
    static allBySeat () {
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        return new TableBookingConfig('ALL_BY_SEAT')
    }

    /**
     * @param {object} tables
     * @returns {TableBookingConfig}
     */
    static custom (tables: any) {
        return new TableBookingConfig('CUSTOM', tables)
    }
}
