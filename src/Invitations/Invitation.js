class Invitation {
    constructor (json) {
        this.email = json.email
        this.date = new Date(json.date)
    }
}

module.exports = Invitation
