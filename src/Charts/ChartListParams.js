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
        if(typeof this.filter !== 'undefined' && this.filter !== null){
            result.filter = this.filter;
        }
        if(typeof this.tag !== 'undefined' && this.tag !== null ){
            result.tag = this.tag;
        }
        if(typeof this.expand !== 'undefined' && this.expand !== null ){
            result.expand = 'events';
        }

        return result;
    }
}

module.exports = ChartListParams;
