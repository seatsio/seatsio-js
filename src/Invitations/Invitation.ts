import { Dict } from '../Dict'

export type InvitationJson = Dict<any>

export class Invitation {
    date: Date
    email: string
    id: number
    status: string

    constructor (json: InvitationJson) {
        this.id = json.id
        this.status = json.status
        this.email = json.email
        this.date = new Date(json.date)
    }
}
