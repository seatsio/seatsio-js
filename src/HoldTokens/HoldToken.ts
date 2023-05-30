import { Dict } from '../Dict'

type HoldTokenJson = Dict<any>

export class HoldToken {
    expiresAt: Date
    expiresInSeconds: number
    holdToken: string
    workspaceKey: string

    constructor (json: HoldTokenJson) {
        this.holdToken = json.holdToken
        this.expiresAt = new Date(json.expiresAt)
        this.expiresInSeconds = json.expiresInSeconds
        this.workspaceKey = json.workspaceKey
    }
}
