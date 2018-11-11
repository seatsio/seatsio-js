class Subaccount {
    constructor(id, secretKey, designerKey, publicKey, name, email, active) {
        /* int*/
        this.id = id;
        /* string */
        this.secretKey = secretKey;
        /* string */
        this.designerKey = designerKey;
        /* string */
        this.publicKey = publicKey;
        /* string */
        this.name = name;
        /* string */
        this.email = email;
        /* boolean */
        this.active = active;
    }
}

module.exports = Subaccount;
