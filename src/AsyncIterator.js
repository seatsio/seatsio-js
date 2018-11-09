const Chart = require('./Charts/Chart.js');
const Event = require('./Events/Event.js');
const StatusChange = require('./Events/StatusChange.js');
const Subaccount = require('./Subaccounts/Subaccount.js');
const Page = require('./Page.js');


class AsyncIterator {
    constructor(url, client, objType, params = {}) {
        /*  [Chart] */
        this.items = [];
        /* [Page] */
        this.pages = [];
        /* string */
        this.objType = objType;
        this.index = 0;
        this.nextPageMustBeFetched = true;
        this.client = client;
        this.url = url;
        this.params = params;
    }

    eventObj(eventsData) {
        return eventsData.map(eventData => {
            let updatedOn = eventData.updatedOn ? new Date(eventData.updatedOn) : null;

            return new Event(eventData.id, eventData.key, eventData.bookWholeTables,
                eventData.supportsBestAvailable, eventData.forSaleConfig, eventData.tableBookingModes, eventData.chartKey,
                new Date(eventData.createdOn), updatedOn);
        });
    }

    charts(data) {
        let charts = [];
        data.items.forEach((chartData) => {
            let events = chartData.events ? this.eventObj(chartData.events) : null;
            let chart = new Chart(chartData.name, chartData.id, chartData.key, chartData.status, chartData.tags,
                chartData.publishedVersionThumbnailUrl, chartData.publishedVersionThumbnailUrl, events, chartData.archived);
            this.items.push(chart);
            charts.push(chart);
        });

        this.pages.push(new Page(charts, data.next_page_starts_after, data.previous_page_ends_before));
    }

    events(data){
        let events = [];
        data.items.forEach(eventData => {
            let updatedOn = eventData.updatedOn ? new Date(eventData.updatedOn) : null;

            let event = new Event(eventData.id, eventData.key, eventData.bookWholeTables,
                eventData.supportsBestAvailable, eventData.forSaleConfig, eventData.tableBookingModes, eventData.chartKey,
                new Date(eventData.createdOn), updatedOn);
            this.items.push(event);
            events.push(event);
        });
        this.pages.push(new Page(events, data.next_page_starts_after, data.previous_page_ends_before));
    }

    statusChanges(data){
        let statusChanges = [];
        data.items.forEach((statusData) => {
            let status = new StatusChange(statusData.id, statusData.eventId, statusData.status,
                statusData.quantity, statusData.objectLabel,
                new Date(statusData.date), statusData.orderId, statusData.extraData);

            this.items.push(status);
            statusChanges.push(status);
        });
        this.pages.push(new Page(statusChanges, data.next_page_starts_after, data.previous_page_ends_before));
    }

    subaccounts(data) {
        let subaccounts = [];
        data.items.forEach((subaccountData) => {
            let subaccount = new Subaccount(subaccountData.id, subaccountData.secretKey, subaccountData.designerKey,
                subaccountData.publicKey, subaccountData.name, subaccountData.email, subaccountData.active);
            this.items.push(subaccount);
            subaccounts.push(subaccount);
        });
        this.pages.push(new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before));
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

                switch(this.objType){
                    case 'charts':
                        this.charts(res.data);
                        break;
                    case 'events':
                        this.events(res.data);
                        break;
                    case 'statusChanges':
                        this.statusChanges(res.data);
                        break;
                    case 'subaccounts':
                        this.subaccounts(res.data);
                        break;
                }
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
                    return Promise.resolve({
                        done: true
                    });
                }
                else {
                    return Promise.resolve({value: _this.items[_this.index++], done: false});
                }
            }
        };
    }
}

module.exports = AsyncIterator;
