const Account = require('./Account.js');

class Accounts {
    constructor(client) {
        this.client = client;
    }

    retrieveMyAccount() {
        return this.client.get('/accounts/me').then((res) => Accounts.accountCreator(res.data));
    }

    static accountCreator(accountData){
        return new Account(accountData.secretKey, accountData.designerKey, accountData.publicKey, accountData.settings, accountData.email);
    }
}

module.exports = Accounts;