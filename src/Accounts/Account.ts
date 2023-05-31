import { AccountSettings } from './AccountSettings'
import { Dict } from '../Dict'

type AccountJson = Dict<any>

export class Account {
    company: any
    designerKey: string
    email: string
    publicKey: string
    role: string
    secretKey: string
    settings: AccountSettings

    constructor (json: AccountJson) {
        this.secretKey = json.secretKey
        this.designerKey = json.designerKey
        this.publicKey = json.publicKey
        this.settings = new AccountSettings(json.settings)
        this.company = json.company
        this.email = json.email
        this.role = json.role
    }
}
