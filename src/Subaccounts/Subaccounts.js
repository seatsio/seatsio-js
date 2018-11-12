const AsyncIterator = require('../AsyncIterator.js');
const utilities = require('../utilities.js');

class Subaccounts {

    constructor(client) {
        this.client = client;
        this.active = new AsyncIterator('/subaccounts/active', this.client, 'subaccounts');
        this.inactive = new AsyncIterator('/subaccounts/inactive', this.client, 'subaccounts');
    }

    /**
     * @return Subaccount
     */
    create(name = null) {
        return this.doCreate(null, name);
    }

    /**
     * @return Subaccount
     */
    createWithEmail(email, name = null) {
        return this.doCreate(email, name);
    }

    /**
     * @then Subaccount
     */
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
    /**
     * @return Chart
     */
    copyChartToSubaccount(fromId, toId, chartKey) {
        return this.client.post(`/subaccounts/${fromId}/charts/${chartKey}/actions/copy-to/${toId}`)
                          .then((res) => utilities.createChart(res.data));
    }

    /**
     * @return Chart
     */
    copyChartToParent(id, chartKey) {
        return this.client.post(`/subaccounts/${id}/charts/${chartKey}/actions/copy-to/parent`)
                          .then((res) => utilities.createChart(res.data));
    }

    activate(id) {
        return this.client.post(`/subaccounts/${id}/actions/activate`);
    }

    deactivate(id) {
        return this.client.post(`/subaccounts/${id}/actions/deactivate`);
    }

    /**
     * @return Subaccount
     */
    retrieve(id) {
        return this.client.get(`/subaccounts/${id}`).then((res) => utilities.createSubaccount(res.data));
    }

    update(id, name, email) {
        let requestParameters = {};

        if (name !== null) {
            requestParameters.name = name;
        }

        if (email !== null) {
            requestParameters.email = email;
        }

        return this.client.post(`/subaccounts/${id}`, requestParameters);
    }

    regenerateSecretKey(id) {
        return this.client.post(`/subaccounts/${id}/secret-key/actions/regenerate`).then((res) => res.data);
    }

    regenerateDesignerKey(id) {
        return this.client.post(`/subaccounts/${id}/designer-key/actions/regenerate`).then((res) => res.data);
    }

    listAll(){
        return new AsyncIterator('/subaccounts', this.client, 'subaccounts');
    }

    listFirstPage(){

    }

    listPageAfter(){

    }

    listPageBefore(){

    }

}

module.exports = Subaccounts;
