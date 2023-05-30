import { Dict } from '../Dict'

export type WorkspaceJson = Dict<any>

export class Workspace {
    id: number
    isActive: boolean
    isDefault: boolean
    isTest: boolean
    key: string
    name: string
    secretKey: string
    settings: any

    constructor (json: WorkspaceJson) {
        this.id = json.id
        this.key = json.key
        this.secretKey = json.secretKey
        this.name = json.name
        this.settings = json.settings
        this.isDefault = json.isDefault
        this.isTest = json.isTest
        this.isActive = json.isActive
    }
}
