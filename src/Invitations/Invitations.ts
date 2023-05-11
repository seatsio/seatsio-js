import { Invitation } from './Invitation'

export class Invitations {
    /**
     * @param {Axios} client
     */
    constructor (client) {
        this.client = client
    }

    /**
     * @returns {Promise<Invitation[]>}
     */
    listAll () {
        return this.client.get('/invitations')
            .then((res) => res.data.map(json => new Invitation(json)))
    }
}
