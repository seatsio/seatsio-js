const Event = require('../Events/Event.js');

class IterableAsyncEvents {
    constructor(url, client, params = {}) {
        this.items = [];
        this.index = 0;
        this.nextPageMustBeFetched = true;
        this.client = client;
        this.url = url;
        this.params = params;
    }

    eventCreator(data){
        data.items.forEach(eventData => {
            let updatedOn = eventData.updatedOn ? new Date(eventData.updatedOn) : null;

            let event = new Event(eventData.id, eventData.key, eventData.bookWholeTables,
                eventData.supportsBestAvailable, eventData.forSaleConfig, eventData.tableBookingModes, eventData.chartKey,
                new Date(eventData.createdOn), updatedOn);
            this.items.push(event);
        });
    }

    fetch(fetchParams = {}) {
        return this.client.get(this.url, {params: fetchParams})
            .then((res) => {
                if (res.data.next_page_starts_after) {
                    this.nextPageStartsAfter = res.data.next_page_starts_after;
                    this.nextPageMustBeFetched = true;
                } else {
                    this.nextPageMustBeFetched = false;
                }

                this.eventCreator(res.data);
            });
    }

    [Symbol.asyncIterator]() {
        let _this = this;

        return {
            async next() {
                if (_this.nextPageMustBeFetched && _this.items.length === 0) {
                    await _this.fetch(_this.params);
                } else if (_this.nextPageMustBeFetched && _this.nextPageStartsAfter) {
                    _this.params.start_after_id = _this.nextPageStartsAfter;
                    await _this.fetch(_this.params);
                }
                if (!_this.items[_this.index]) {
                    return {undefined, done: true};
                }
                else {
                    return {value: _this.items[_this.index++], done: false};
                }
            }
        };
    }
}

module.exports = IterableAsyncEvents;
