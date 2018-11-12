const AsyncIterator = require('../AsyncIterator.js');
const PageFetcher = require('../PageFetcher.js');
const Page = require('../Page.js');
const Lister = require('../Lister.js');
const utilities = require('../utilities.js');

class Subaccounts {

    constructor(client) {
        this.client = client;
        this.active = new AsyncIterator('/subaccounts/active', this.client, 'subaccounts');
        this.inactive = new AsyncIterator('/subaccounts/inactive', this.client, 'subaccounts');
    }

    /* @return Subaccount */
    retrieve(id) {
        return this.client.get(`/subaccounts/${id}`).then((res) => utilities.createSubaccount(res.data));
    }

    /* @return Subaccount */
    create(name = null) {
        return this.doCreate(null, name);
    }

    /* @return Subaccount */
    createWithEmail(email, name = null) {
        return this.doCreate(email, name);
    }

    /* @then Subaccount */
    doCreate(email = null, name = null) {
        let requestParameters = {};

        if (name !== null) {
            requestParameters.name = name;
        }

        if (email !== null) {
            requestParameters.email = email;
        }


        return this.client.post('/subaccounts', requestParameters)
            .then((res) => utilities.createSubaccount(res.data));
    }

    update(id, name = null, email = null) {
        let requestParameters = {};

        if (name !== null) {
            requestParameters.name = name;
        }

        if (email !== null) {
            requestParameters.email = email;
        }

        return this.client.post(`/subaccounts/${id}`, requestParameters);
    }

    activate(id) {
        return this.client.post(`/subaccounts/${id}/actions/activate`);
    }

    deactivate(id) {
        return this.client.post(`/subaccounts/${id}/actions/deactivate`);
    }

    /* @return String */
    regenerateSecretKey(id) {
        return this.client.post(`/subaccounts/${id}/secret-key/actions/regenerate`).then((res) => res.data);
    }

    /* @return String */
    regenerateDesignerKey(id) {
        return this.client.post(`/subaccounts/${id}/designer-key/actions/regenerate`).then((res) => res.data);
    }

    /* @return Chart */
    copyChartToParent(id, chartKey) {
        return this.client.post(`/subaccounts/${id}/charts/${chartKey}/actions/copy-to/parent`)
            .then((res) => utilities.createChart(res.data));
    }

    /* @return Chart */
    copyChartToSubaccount(fromId, toId, chartKey) {
        return this.client.post(`/subaccounts/${fromId}/charts/${chartKey}/actions/copy-to/${toId}`)
            .then((res) => utilities.createChart(res.data));
    }

    /* @return AsyncIterator */
    listAll() {
        return new AsyncIterator('/subaccounts', this.client, 'subaccounts');
    }

    /* @return Page */
    listFirstPage(pageSize = null) {
        return this.iterator().firstPage(pageSize);
    }

    /* @return Page */
    listPageAfter(afterId, pageSize = null) {
        return this.iterator().pageAfter(afterId, null, pageSize);
    }

    /* @return Page */
    listPageBefore(beforeId, pageSize = null) {
        return this.iterator().pageBefore(beforeId, null, pageSize);
    }

    /* @return Lister */
    iterator() {
        return new Lister(new PageFetcher('/subaccounts', this.client, results => {
            let subaccounts = results.items.map((subaccountsData) => utilities.createSubaccount(subaccountsData));
            return new Page(subaccounts);
        }));
    }

}

module.exports = Subaccounts;
