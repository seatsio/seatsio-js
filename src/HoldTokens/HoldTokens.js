const HoldToken = require('./HoldToken.js');

class HoldTokens {
    constructor(client) {
        this.client = client;
    }

    createHoldToken(data){
        return new HoldToken(data.holdToken, new Date(data.expiresAt), data.expiresInSeconds);
    }

    create(expiresInMinutes = null) {
        let request = {};
        if (expiresInMinutes !== null) {
            request.expiresInMinutes = expiresInMinutes;
        }
        return this.client.post('/hold-tokens', request).then((res) => this.createHoldToken(res.data));
    }

    retrieve(holdToken) {
        return this.client.get(`/hold-tokens/${holdToken}`).then((res) => this.createHoldToken(res.data));
    }

    expiresInMinutes(holdToken, minutes) {
        let request = {};
        request.expiresInMinutes = minutes;
        return this.client.post(`/hold-tokens/${holdToken}`, request).then((res) => this.createHoldToken(res.data));
    }
}

module.exports = HoldTokens;
