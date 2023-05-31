export class Page<T> {
    items: T[]
    nextPageStartsAfter: number | null
    previousPageEndsBefore: number | null
    constructor (items: T[], afterId: number | null = null, beforeId: number | null = null) {
        this.items = items
        this.nextPageStartsAfter = afterId
        this.previousPageEndsBefore = beforeId
    }

    [Symbol.iterator] () {
        let index = 0
        const charts = this.items
        return {
            next () {
                if (index < charts.length) {
                    const chart = charts[index]
                    index++
                    return { value: chart, done: false }
                } else {
                    return { done: true }
                }
            }
        }
    }
}
