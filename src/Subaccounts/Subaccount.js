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
        this.email = subaccount.email
        this.active = subaccount.active
        this.accountId = subaccount.accountId
    }
}

module.exports = Subaccount
