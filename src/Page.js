class Page {
    constructor(items, afterId = null, beforeId = null) {
        this.items = items;
        this.nextPageStartsAfter = afterId;
        this.previousPageEndsBefore = beforeId;
    }

    setNextPageStartsAfter(nextPageStartsAfter) {
        this.nextPageStartsAfter = nextPageStartsAfter;
    }

    setPreviousPageEndsBefore(previousPageEndsBefore) {
        this.previousPageEndsBefore = previousPageEndsBefore;
    }

    [Symbol.iterator]() {
        let index = 0;
        var charts = this.items;
        return {
            next() {
                if (index < charts.length) {
                    var chart = charts[index];
                    index++;
                    //console.log(chart);
                    return {value: chart, done: false}
                }
                else {
                    return {done: true}
                }
            }
        };
    }

}


module.exports = Page;
