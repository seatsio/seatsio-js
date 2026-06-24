export class Month {
    public year: number
    public month: number

    constructor (year: number, month: number) {
        this.year = year
        this.month = month
    }

    toString () {
        return `${this.year}-${this.month}`
    }
}
