export class Page {
    items: any
    nextPageStartsAfter: any
    previousPageEndsBefore: any
    constructor (items: any, afterId = null, beforeId = null) {
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
