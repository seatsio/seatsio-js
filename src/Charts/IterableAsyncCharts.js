const Chart = require('./Chart.js');
const Event = require('../Events/Event.js');
const Page = require('../Page.js');

class IterableAsyncCharts {
    constructor(url, client, params = {}) {
        this.items = []; /*  array of charts */
        this.pages = []; /*  array of Pages of charts*/
        this.index = 0;
        this.nextPageMustBeFetched = true;
        this.client = client;
        this.url = url;
        this.params = params;
    }

    chartCreator(data) {
        let charts = [];
        data.items.forEach((chartData) => {
            let events = chartData.events ? this.eventCreator(chartData.events) : null;
            let chart = new Chart(chartData.name, chartData.id, chartData.key, chartData.status, chartData.tags,
                chartData.publishedVersionThumbnailUrl, chartData.publishedVersionThumbnailUrl, events, chartData.archived);
            this.items.push(chart);
            charts.push(chart);
        });

        this.pages.push(new Page(charts, data.next_page_starts_after, data.previous_page_ends_before));
    }

    eventCreator(eventsData){
        return eventsData.map (eventData => {
            let updatedOn = eventData.updatedOn ? new Date(eventData.updatedOn) : null;

            return new Event(eventData.id, eventData.key, eventData.bookWholeTables,
                eventData.supportsBestAvailable, eventData.forSaleConfig, eventData.tableBookingModes, eventData.chartKey,
                new Date(eventData.createdOn), updatedOn);
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

                this.chartCreator(res.data);
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
