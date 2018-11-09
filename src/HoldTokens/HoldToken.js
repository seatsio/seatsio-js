class HoldToken {
    constructor(holdToken, expiresAt, expiresInSeconds) {
        /* string */
        this.holdToken = holdToken;
        /* Date */
        this.expiresAt = expiresAt;
        /* int */
        this.expiresInSeconds = expiresInSeconds;
    }
}

module.exports = HoldToken;
