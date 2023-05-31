import { Dict } from '../Dict'

export type SubaccountJson = Dict<any>

export class Subaccount {
    active: boolean
    designerKey: string
    id: number
    name: string
    publicKey: string
    secretKey: string

    constructor (json: SubaccountJson) {
        this.id = json.id
        this.secretKey = json.secretKey
        this.designerKey = json.designerKey
        this.publicKey = json.publicKey
        this.name = json.name
        this.active = json.active
    }
}
