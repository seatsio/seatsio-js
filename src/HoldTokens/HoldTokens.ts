import { HoldToken } from './HoldToken'
import { Axios } from 'axios'

export class HoldTokens {
    client: Axios
    constructor (client: Axios) {
        this.client = client
    }

    create (expiresInMinutes: number | null = null) {
        const request: any = {}
        if (expiresInMinutes !== null) {
            request.expiresInMinutes = expiresInMinutes
        }
        return this.client.post('/hold-tokens', request).then(res => new HoldToken(res.data))
    }

    expiresInMinutes (holdToken: string, minutes: number) {
        const request: any = {}
        request.expiresInMinutes = minutes
        return this.client.post(`/hold-tokens/${holdToken}`, request).then(res => new HoldToken(res.data))
    }

    retrieve (holdToken: string) {
        return this.client.get(`/hold-tokens/${holdToken}`).then(res => new HoldToken(res.data))
    }
}
