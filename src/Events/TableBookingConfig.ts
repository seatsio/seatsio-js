export class TableBookingConfig {
    mode: any
    tables: any

    constructor (mode: any, tables: any) {
        this.mode = mode
        this.tables = tables
    }

    static inherit () {
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        return new TableBookingConfig('INHERIT')
    }

    static allByTable () {
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        return new TableBookingConfig('ALL_BY_TABLE')
    }

    static allBySeat () {
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        return new TableBookingConfig('ALL_BY_SEAT')
    }

    static custom (tables: any) {
        return new TableBookingConfig('CUSTOM', tables)
    }
}
