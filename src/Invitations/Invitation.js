class Invitation {
    constructor (json) {
        this.id = json.id
        this.status = json.status
        this.email = json.email
        this.date = new Date(json.date)
    }
}

module.exports = Invitation
