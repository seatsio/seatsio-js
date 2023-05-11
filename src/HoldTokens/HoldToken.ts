export class HoldToken {
    expiresAt: any;
    expiresInSeconds: any;
    holdToken: any;
    workspaceKey: any;
    /**
     * @param {object} holdToken
     */
    constructor (holdToken: any) {
        this.holdToken = holdToken.holdToken
        this.expiresAt = new Date(holdToken.expiresAt)
        this.expiresInSeconds = holdToken.expiresInSeconds
        this.workspaceKey = holdToken.workspaceKey
    }
}
