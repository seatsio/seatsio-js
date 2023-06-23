export class LocalDate {
    private readonly year: number
    private readonly month: number
    private readonly day: number

    constructor (year: number, month: number, day: number) {
        this.year = year
        this.month = month
        this.day = day
    }

    toString () {
        return this.year + '-' + String(this.month).padStart(2, '0') + '-' + String(this.day).padStart(2, '0')
    }

    static parse (date: string) {
        const year = parseInt(date.substring(0, 4))
        const month = parseInt(date.substring(5, 7))
        const day = parseInt(date.substring(8, 10))
        return new LocalDate(year, month, day)
    }
}
