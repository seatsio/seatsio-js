import { Invitation } from './Invitation'

export class Invitations {
    client: any;
    /**
     * @param {Axios} client
     */
    constructor (client: any) {
        this.client = client
    }

    /**
     * @returns {Promise<Invitation[]>}
     */
    listAll () {
        return this.client.get('/invitations')
            .then((res: any) => res.data.map((json: any) => new Invitation(json)));
    }
}
