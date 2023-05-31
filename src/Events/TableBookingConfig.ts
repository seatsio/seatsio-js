export class TableBookingConfig {
    mode: string
    tables?: { [key: string]: string }

    constructor (mode: string, tables?: { [key: string]: string }) {
        this.mode = mode
        this.tables = tables
    }

    static inherit () {
        return new TableBookingConfig('INHERIT')
    }

    static allByTable () {
        return new TableBookingConfig('ALL_BY_TABLE')
    }

    static allBySeat () {
        return new TableBookingConfig('ALL_BY_SEAT')
    }

    static custom (tables: { [key: string]: string }) {
        return new TableBookingConfig('CUSTOM', tables)
    }
}
