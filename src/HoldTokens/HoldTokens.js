const utilities = require('../utilities.js');

class HoldTokens {
    constructor(client) {
        this.client = client;
    }

    /* @return HoldToken */
    create(expiresInMinutes = null) {
        let request = {};
        if (expiresInMinutes !== null) {
            request.expiresInMinutes = expiresInMinutes;
        }
        return this.client.post('/hold-tokens', request).then((res) => utilities.createHoldToken(res.data));
    }

    /* @return HoldToken */
    expiresInMinutes(holdToken, minutes) {
        let request = {};
        request.expiresInMinutes = minutes;
        return this.client.post(`/hold-tokens/${holdToken}`, request).then((res) => utilities.createHoldToken(res.data));
    }

    /* @return HoldToken */
    retrieve(holdToken) {
        return this.client.get(`/hold-tokens/${holdToken}`).then((res) => utilities.createHoldToken(res.data));
    }


}

module.exports = HoldTokens;
