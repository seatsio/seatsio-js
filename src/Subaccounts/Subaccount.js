class Subaccount {
    /**
     *
     * @param {number} id
     * @param {string} secretKey
     * @param {string} designerKey
     * @param {string} publicKey
     * @param {string} name
     * @param {string} email
     * @param {boolean} active
     */
    constructor(id, secretKey, designerKey, publicKey, name, email, active) {
        this.id = id;
        this.secretKey = secretKey;
        this.designerKey = designerKey;
        this.publicKey = publicKey;
        this.name = name;
        this.email = email;
        this.active = active;
    }
}

module.exports = Subaccount;
