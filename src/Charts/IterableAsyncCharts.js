const Chart = require('./Chart.js');
const Event = require('../Events/Event.js');

class IterableAsyncCharts {
    constructor(url, client, params = {}) {
        this.items = [];
        this.index = 0;
        this.nextPageMustBeFetched = true;
        this.client = client;
        this.url = url;
        this.params = params;
    }

    chartCreator(data) {
        data.items.forEach((chartData) => {
            let events = chartData.events ? IterableAsyncCharts.eventCreator(chartData.events) : null;
            let chart = new Chart(chartData.name, chartData.id, chartData.key, chartData.status, chartData.tags,
                chartData.publishedVersionThumbnailUrl, chartData.publishedVersionThumbnailUrl, events, chartData.archived);
            this.items.push(chart);
        });
    }

    static eventCreator(eventsData){
        return eventsData.map (event => {
            let bookWholeTables = event.bookWholeTables || null;
            let supportsBestAvailable = event.supportsBestAvailable || null;
            let forSaleConfig = event.forSaleConfig || null;
            let tableBookingModes = event.tableBookingModes || null;
            let updatedOn = event.updatedOn || null;

            return new Event(event.id, event.key, bookWholeTables,
                supportsBestAvailable, forSaleConfig, tableBookingModes, event.chartKey,
                event.createdOn, updatedOn)
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

                this.chartCreator(res.data)
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

module.exports = IterableAsyncCharts;
