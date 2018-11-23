const utilities = require('../utilities.js');

class Accounts {
    constructor(client) {
        this.client = client;
    }

    /**
     * @returns {Promise} Promise that resolves to Account object
     */
    retrieveMyAccount() {
        return this.client.get('/accounts/me').then((res) => utilities.createAccount(res.data));
    }
}

module.exports = Accounts;