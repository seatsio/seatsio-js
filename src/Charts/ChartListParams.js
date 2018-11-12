class ChartListParams {
    constructor(filter = null, tag = null, expandEvents = null) {
        this.filter = filter;
        this.tag = tag;
        if (expandEvents === true) {
            this.expand = 'events';
        }
    }

    withFilter(filter) {
        this.filter = filter;
        return this;
    }

    withTag(tag) {
        this.tag = tag;
        return this;
    }

    withExpandEvents(expandEvents) {
        if (expandEvents === true) {
            this.expand = 'events';
        }
        return this;
    }
}

module.exports = ChartListParams;
