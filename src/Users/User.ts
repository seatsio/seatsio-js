import { Dict } from '../Dict'

export type UserJson = Dict<any>

export class User {
    createdOn: Date | null
    designerKey: string
    email: string
    id: number
    isActive: boolean
    name: string
    role: string
    secretKey: string
    status: string
    workspaces: any

    constructor (json: UserJson) {
        this.id = json.id
        this.email = json.email
        this.name = json.name
        this.secretKey = json.secretKey
        this.designerKey = json.designerKey
        this.role = json.role
        this.createdOn = json.createdOn ? new Date(json.createdOn) : null
        this.isActive = json.isActive
        this.status = json.status
        this.workspaces = json.workspaces
    }
}
