class Account {
    constructor(secretKey, designerKey, publicKey, settings, email) {
        /*  string */
        this.secretKey = secretKey;
        /*  string */
        this.designerKey = designerKey;
        /*  string */
        this.publicKey = publicKey;
        /*  Account Settings */
        this.settings = settings;
        /*  string */
        this.email = email;
    }
}

module.exports = Account;
