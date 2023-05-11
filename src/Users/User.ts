export class User {
    createdOn: any;
    designerKey: any;
    email: any;
    id: any;
    isActive: any;
    name: any;
    role: any;
    secretKey: any;
    status: any;
    workspaces: any;
    constructor (userJson: any) {
        this.id = userJson.id
        this.email = userJson.email
        this.name = userJson.name
        this.secretKey = userJson.secretKey
        this.designerKey = userJson.designerKey
        this.role = userJson.role
        this.createdOn = userJson.createdOn ? new Date(userJson.createdOn) : null
        this.isActive = userJson.isActive
        this.status = userJson.status
        this.workspaces = userJson.workspaces
    }
}
