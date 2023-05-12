export class Invitation {
    date: any
    email: any
    id: any
    status: any
    constructor (json: any) {
        this.id = json.id
        this.status = json.status
        this.email = json.email
        this.date = new Date(json.date)
    }
}
