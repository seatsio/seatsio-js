import { Dict } from '../Dict'

export type UserJson = Dict<any>

export class User {
    createdOn: Date | null
    email: string
    id: number
    isActive: boolean
    name: string
    role: string
    status: string
    workspaces: any
    nonAdminHasAccessToAllWorkspaces?: boolean

    constructor (json: UserJson) {
        this.id = json.id
        this.email = json.email
        this.name = json.name
        this.role = json.role
        this.createdOn = json.createdOn ? new Date(json.createdOn) : null
        this.isActive = json.isActive
        this.status = json.status
        this.workspaces = json.workspaces
        this.nonAdminHasAccessToAllWorkspaces = json.nonAdminHasAccessToAllWorkspaces
    }
}
