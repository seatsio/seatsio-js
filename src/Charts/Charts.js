const PageFetcher = require('../PageFetcher.js');
const Chart = require('./Chart.js');
const Event =  require( '../Events/Event.js');
const Page = require('../Page.js');
const Lister = require('./Lister.js');
const AsyncIterator = require('../AsyncIterator.js');

class Charts {
    constructor(client) {
        this.client = client;
        this.archive = new AsyncIterator('/charts/archive', this.client, 'charts');
    }

    static chartCreator(chartData){
        let events = chartData.events ? Charts.eventCreator(chartData.events) : null;

        let draftVersionThumbnailUrl = chartData.draftVersionThumbnailUrl || null;
        return new Chart(chartData.name, chartData.id, chartData.key, chartData.status, chartData.tags,
            chartData.publishedVersionThumbnailUrl, draftVersionThumbnailUrl, events, chartData.archived);
    }

    static eventCreator(eventsData){
        return eventsData.map (event => {
            let supportsBestAvailable = event.supportsBestAvailable || null;
            let forSaleConfig = event.forSaleConfig || null;
            let tableBookingModes = event.tableBookingModes || null;
            let updatedOn = event.updatedOn ? new Date(event.updatedOn) : null;

            return new Event(event.id, event.key, event.bookWholeTables,
                supportsBestAvailable, forSaleConfig, tableBookingModes, event.chartKey,
                new Date(event.createdOn), updatedOn)
        });
    }

    create(name = null, venueType = null, categories = null) {
        let requestParameters = {};

        if (name !== null) {
            requestParameters.name = name;
        }

        if (venueType !== null) {
            requestParameters.venueType = venueType;
        }

        if (categories !== null) {
            requestParameters.categories = categories;
        }

        return this.client.post('charts', requestParameters)
            .then((res) => Charts.chartCreator(res.data));
    }

    addTag(key, tag) {
        let url = `charts/${key}/tags/${encodeURIComponent(tag)}`;
        return this.client.post(url);
    }

    removeTag(key, tag) {
        let url = `charts/${key}/tags/${encodeURIComponent(tag)}`;
        return this.client.delete(url);
    }

    retrieve(key) {
        return this.client.get(`charts/${key}`)
            .then((res) => Charts.chartCreator(res.data));
    }

    retrieveWithEvents(key) {
        return this.client.get(`charts/${key}?expand=events`)
            .then((res) => Charts.chartCreator(res.data));
    }

    retrievePublishedVersion(key) {
        return this.client.get(`charts/${key}/version/published`)
            .then((res) => res.data);
    }

    retrieveDraftVersion(key) {
        return this.client.get(`charts/${key}/version/draft`)
            .then((res) => res.data);
    }

    retrieveDraftVersionThumbnail(key) {
        return this.client.get(`/charts/${key}/version/draft/thumbnail`)
            .then((res) => res.data);
    }

    retrievePublishedVersionThumbnail(key) {
        return this.client.get(`/charts/${key}/version/published/thumbnail`)
            .then((res) => res.data);
    }


    listAllTags() {
        return this.client.get('/charts/tags')
            .then((res) => res.data.tags);
    }

    copy(key) {
        return this.client.post(`charts/${key}/version/published/actions/copy`)
            .then((res) => Charts.chartCreator(res.data));
    }

    copyDraftVersion(key) {
        return this.client.post(`charts/${key}/version/draft/actions/copy`)
            .then((res) => Charts.chartCreator(res.data));
    }

    copyToSubaccount(key, subaccountId) {
        return this.client.post(`charts/${key}/version/published/actions/copy-to/${subaccountId}`)
            .then((res) => Charts.chartCreator(res.data));
    }

    discardDraftVersion(key) {
        return this.client.post(`/charts/${key}/version/draft/actions/discard`);
    }

    publishDraftVersion(key) {
        return this.client.post(`charts/${key}/version/draft/actions/publish`);
    }

    moveToArchive(key) {
        return this.client.post(`charts/${key}/actions/move-to-archive`);
    }

    moveOutOfArchive(key) {
        return this.client.post(`charts/${key}/actions/move-out-of-archive`);
    }

    update(key, name = null, categories = null) {
        let requestParameters = {};

        if (name !== null) {
            requestParameters.name = name;
        }

        if (categories !== null) {
            requestParameters.categories = categories;
        }

        return this.client.post(`/charts/${key}`, requestParameters);
    }

    listFirstPage(chartListParams = null, pageSize = null) {
        return this.iterator().firstPage(chartListParams, pageSize);
    }

    listPageAfter(afterId, chartListParameters = null, pageSize = null) {
        return this.iterator().pageAfter(afterId, chartListParameters, pageSize);
    }

    listPageBefore(beforeId, chartListParameters = null, pageSize = null) {
        return this.iterator().pageBefore(beforeId, chartListParameters, pageSize);
    }

    listAll(requestParameters = {}) {
        return new AsyncIterator('/charts', this.client, 'charts', requestParameters);
    }

    eventCreator(eventsData){
        return eventsData.map (eventData => {
            let updatedOn = eventData.updatedOn ? new Date(eventData.updatedOn) : null;

            return new Event(eventData.id, eventData.key, eventData.bookWholeTables,
                eventData.supportsBestAvailable, eventData.forSaleConfig, eventData.tableBookingModes, eventData.chartKey,
                new Date(eventData.createdOn), updatedOn);
        });
    }

    iterator() {
        return new Lister(new PageFetcher('/charts', this.client, results => {
            let chartItems = results.items.map((chartData) => {
                let events = chartData.events ? this.eventCreator(chartData.events) : null;
                return new Chart(chartData.name, chartData.id, chartData.key, chartData.status, chartData.tags,
                    chartData.publishedVersionThumbnailUrl, chartData.publishedVersionThumbnailUrl, events, chartData.archived);
            });
            return new Page(chartItems);
        }));
    }
}

module.exports = Charts;
