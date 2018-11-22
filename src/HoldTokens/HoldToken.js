class HoldToken {
    /**
     * @param {string} holdToken
     * @param {Date} expiresAt
     * @param {number} expiresInSeconds
     */
    constructor(holdToken, expiresAt, expiresInSeconds) {
        this.holdToken = holdToken;
        this.expiresAt = expiresAt;
        this.expiresInSeconds = expiresInSeconds;
    }
}

module.exports = HoldToken;
