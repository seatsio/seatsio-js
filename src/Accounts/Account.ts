import { AccountSettings } from './AccountSettings'

export class Account {
    company: any
    designerKey: any
    email: any
    publicKey: any
    role: any
    secretKey: any
    settings: any

    constructor (account: any) {
        this.secretKey = account.secretKey
        this.designerKey = account.designerKey
        this.publicKey = account.publicKey
        this.settings = new AccountSettings(account.settings)
        this.company = account.company
        this.email = account.email
        this.role = account.role
    }
}
