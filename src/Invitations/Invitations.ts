import { Invitation, InvitationJson } from './Invitation'
import { Axios } from 'axios'

export class Invitations {
    client: Axios

    constructor (client: Axios) {
        this.client = client
    }

    listAll () {
        return this.client.get('/invitations')
            .then(res => res.data.map((json: InvitationJson) => new Invitation(json)))
    }
}
