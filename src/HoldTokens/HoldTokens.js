import { HoldToken } from './HoldToken'

export class HoldTokens {
    constructor (client) {
        this.client = client
    }

    create (expiresInMinutes = null) {
        const request = {}
        if (expiresInMinutes !== null) {
            request.expiresInMinutes = expiresInMinutes
        }
        return this.client.post('/hold-tokens', request).then((res) => new HoldToken(res.data))
    }

    expiresInMinutes (holdToken, minutes) {
        const request = {}
        request.expiresInMinutes = minutes
        return this.client.post(`/hold-tokens/${holdToken}`, request).then((res) => new HoldToken(res.data))
    }

    retrieve (holdToken) {
        return this.client.get(`/hold-tokens/${holdToken}`).then((res) => new HoldToken(res.data))
    }
}
