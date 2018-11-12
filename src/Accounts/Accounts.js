const utilities = require('../utilities.js');

class Accounts {
    constructor(client) {
        this.client = client;
    }

    /* @return  Account */
    retrieveMyAccount() {
        return this.client.get('/accounts/me').then((res) => utilities.createAccount(res.data));
    }
}

module.exports = Accounts;