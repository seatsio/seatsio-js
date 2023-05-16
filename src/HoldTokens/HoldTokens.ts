import { HoldToken } from './HoldToken'

export class HoldTokens {
    client: any
    constructor (client: any) {
        this.client = client
    }

    create (expiresInMinutes = null) {
        const request = {}
        if (expiresInMinutes !== null) {
            // @ts-expect-error TS(2339): Property 'expiresInMinutes' does not exist on type... Remove this comment to see the full error message
            request.expiresInMinutes = expiresInMinutes
        }
        return this.client.post('/hold-tokens', request).then((res: any) => new HoldToken(res.data))
    }

    expiresInMinutes (holdToken: any, minutes: any) {
        const request = {}
        // @ts-expect-error TS(2339): Property 'expiresInMinutes' does not exist on type... Remove this comment to see the full error message
        request.expiresInMinutes = minutes
        return this.client.post(`/hold-tokens/${holdToken}`, request).then((res: any) => new HoldToken(res.data))
    }

    retrieve (holdToken: any) {
        return this.client.get(`/hold-tokens/${holdToken}`).then((res: any) => new HoldToken(res.data))
    }
}
