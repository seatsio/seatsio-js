class Account {
    constructor(secretKey, designerKey, publicKey, settings, email) {
        this.secretKey = secretKey; /*  string */
        this.designerKey = designerKey; /*  string */
        this.publicKey = publicKey; /*  string */
        this.settings = settings; /*  Account Settings */
        this.email = email; /*  string */
    }
}

module.exports = Account;
