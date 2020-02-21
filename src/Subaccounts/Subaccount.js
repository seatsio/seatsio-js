class Subaccount {
    /**
     * @param {object} subaccount
     */
    constructor (subaccount) {
        this.id = subaccount.id
        this.secretKey = subaccount.secretKey
        this.designerKey = subaccount.designerKey
        this.publicKey = subaccount.publicKey
        this.name = subaccount.name
        this.active = subaccount.active
    }
}

module.exports = Subaccount
