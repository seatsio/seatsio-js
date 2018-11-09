class ChartListParams {
    constructor(filter = null, tag = null, expandEvents = null){
        this.filter = filter;
        this.tag = tag;
        this.expandEvents= expandEvents;
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

    toArray(){
        let result = {};
        if(this.filter !== null && this.filter != undefined){
            result.filter = this.filter;
        }
        if(this.tag !== null && this.tag != undefined){
            result.tag = this.tag;
        }
        if(this.expand !== null && this.expand != undefined){
            result.expand = 'events';
        }

        return result;
    }
}

module.exports = ChartListParams;
