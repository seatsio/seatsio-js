export class Workspace {
    id: any
    isActive: any
    isDefault: any
    isTest: any
    key: any
    name: any
    secretKey: any
    settings: any
    constructor (workspace: any) {
        this.id = workspace.id
        this.key = workspace.key
        this.secretKey = workspace.secretKey
        this.name = workspace.name
        this.settings = workspace.settings
        this.isDefault = workspace.isDefault
        this.isTest = workspace.isTest
        this.isActive = workspace.isActive
    }
}
