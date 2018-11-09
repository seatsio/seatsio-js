const AsyncIterator = require('../AsyncIterator.js');

class Subaccounts {

    constructor(client) {
        this.client = client;
        //this.active = new IterableSubaccountPages('/subaccounts/active', this.client);
        //this.inactive = new IterableSubaccountPages('/subaccounts/inactive', this.client);
        this.active = new AsyncIterator('/subaccounts/active', this.client, 'subaccounts');
        this.inactive = new AsyncIterator('/subaccounts/inactive', this.client, 'subaccounts');
    }

    create(name = null) {
        return this.doCreate(null, name);
    }

    createWithEmail(email, name = null) {
        return this.doCreate(email, name);
    }

    doCreate(email = null, name = null) {
        let requestParameters = {};

        if (name !== null) {
            requestParameters.name = name;
        }

        if (email !== null) {
            requestParameters.email = email;
        }


        return this.client.post('/subaccounts', requestParameters)
            .then((res) => res.data);
    }

    copyChartToSubaccount(fromId, toId, chartKey) {
        return this.client.post(`/subaccounts/${fromId}/charts/${chartKey}/actions/copy-to/${toId}`)
                          .then((res) => res.data);
    }

    copyChartToParent(id, chartKey) {
        return this.client.post(`/subaccounts/${id}/charts/${chartKey}/actions/copy-to/parent`)
                          .then((res) => res.data);
    }

    activate(id) {
        return this.client.post(`/subaccounts/${id}/actions/activate`);
    }

    deactivate(id) {
        return this.client.post(`/subaccounts/${id}/actions/deactivate`);
    }

    retrieve(id) {
        return this.client.get(`/subaccounts/${id}`).then((res) => res.data);
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
}

module.exports = Subaccounts;
