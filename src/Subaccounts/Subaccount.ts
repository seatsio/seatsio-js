export class Subaccount {
    active: any;
    designerKey: any;
    id: any;
    name: any;
    publicKey: any;
    secretKey: any;
    constructor (subaccount: any) {
        this.id = subaccount.id
        this.secretKey = subaccount.secretKey
        this.designerKey = subaccount.designerKey
        this.publicKey = subaccount.publicKey
        this.name = subaccount.name
        this.active = subaccount.active
    }
}
