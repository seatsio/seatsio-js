import { Invitation } from './Invitation'

export class Invitations {
    client: any

    constructor (client: any) {
        this.client = client
    }

    listAll () {
        return this.client.get('/invitations')
            .then((res: any) => res.data.map((json: any) => new Invitation(json)))
    }
}
