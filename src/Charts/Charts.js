const PageFetcher = require('../PageFetcher.js');
const Page = require('../Page.js');
const Lister = require('../Lister.js');
const AsyncIterator = require('../AsyncIterator.js');
const utilities = require('../utilities.js');

class Charts {
    constructor(client) {
        this.client = client;
        this.archive = new AsyncIterator('/charts/archive', this.client, 'charts');
    }

    /* @return  Chart */
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
            .then((res) => utilities.createChart(res.data));
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

    /* @return  Chart */
    retrieve(key) {
        return this.client.get(`charts/${key}`)
            .then((res) => utilities.createChart(res.data));
    }

    /* @return  Chart */
    retrieveWithEvents(key) {
        return this.client.get(`charts/${key}?expand=events`)
            .then((res) => utilities.createChart(res.data));
    }

    /* @return  object|{} */
    retrievePublishedVersion(key) {
        return this.client.get(`charts/${key}/version/published`)
            .then((res) => res.data);
    }

    /* @return  object|{} */
    retrieveDraftVersion(key) {
        return this.client.get(`charts/${key}/version/draft`)
            .then((res) => res.data);
    }

    publishDraftVersion(key) {
        return this.client.post(`charts/${key}/version/draft/actions/publish`);
    }

    discardDraftVersion(key) {
        return this.client.post(`/charts/${key}/version/draft/actions/discard`);
    }

    moveToArchive(key) {
        return this.client.post(`charts/${key}/actions/move-to-archive`);
    }

    moveOutOfArchive(key) {
        return this.client.post(`charts/${key}/actions/move-out-of-archive`);
    }

    /* @return  Chart */
    copy(key) {
        return this.client.post(`charts/${key}/version/published/actions/copy`)
            .then((res) => utilities.createChart(res.data));
    }

    /* @return  Chart */
    copyDraftVersion(key) {
        return this.client.post(`charts/${key}/version/draft/actions/copy`)
            .then((res) => utilities.createChart(res.data));
    }

    /* @return  Chart */
    copyToSubaccount(key, subaccountId) {
        return this.client.post(`charts/${key}/version/published/actions/copy-to/${subaccountId}`)
            .then((res) => utilities.createChart(res.data));
    }

    /* @return  SVG document */
    retrievePublishedVersionThumbnail(key) {
        return this.client.get(`/charts/${key}/version/published/thumbnail`)
            .then((res) => res.data);
    }

    /* @return  SVG document */
    retrieveDraftVersionThumbnail(key) {
        return this.client.get(`/charts/${key}/version/draft/thumbnail`)
            .then((res) => res.data);
    }

    /* @return [string] */
    listAllTags() {
        return this.client.get('/charts/tags')
            .then((res) => res.data.tags);
    }

    addTag(key, tag) {
        let url = `charts/${key}/tags/${encodeURIComponent(tag)}`;
        return this.client.post(url);
    }

    removeTag(key, tag) {
        let url = `charts/${key}/tags/${encodeURIComponent(tag)}`;
        return this.client.delete(url);
    }

    /* @return AsyncIterator */
    listAll(requestParameters = {}) {
        return new AsyncIterator('/charts', this.client, 'charts', requestParameters);
    }

    /* @return Page */
    listFirstPage(chartListParams = null, pageSize = null) {
        return this.iterator().firstPage(chartListParams, pageSize);
    }

    /* @return Page */
    listPageAfter(afterId, chartListParameters = null, pageSize = null) {
        return this.iterator().pageAfter(afterId, chartListParameters, pageSize);
    }

    /* @return Page */
    listPageBefore(beforeId, chartListParameters = null, pageSize = null) {
        return this.iterator().pageBefore(beforeId, chartListParameters, pageSize);
    }

    /* @return Lister */
    iterator() {
        return new Lister(new PageFetcher('/charts', this.client, results => {
            let chartItems = results.items.map((chartData) => utilities.createChart(chartData));
            return new Page(chartItems);
        }));
    }
}

module.exports = Charts;
