import { Invitation } from '../Invitations/Invitation'
import { Page } from '../Page'
import { User, UserJson } from './User'
import { Lister } from '../Lister'
import { Axios } from 'axios'

export class Users {
    client: Axios

    constructor (client: Axios) {
        this.client = client
    }

    invite (email: string, role: string, workspaces?: string[]) {
        const requestParameters = { email, role, workspaces }

        return this.client.post('/users/actions/invite', requestParameters)
            .then(res => new Invitation(res.data))
    }

    retrieve (id: number) {
        return this.client.get(`/users/${id}`).then(res => new User(res.data))
    }

    activate (id: number) {
        return this.client.post(`/users/${id}/actions/activate`)
    }

    deactivate (id: number) {
        return this.client.post(`/users/${id}/actions/deactivate`)
    }

    listAll (role: string | null = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().all(requestParameters)
    }

    listFirstPage (role: string | null = null, pageSize: number | null = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().firstPage(requestParameters, pageSize)
    }

    listPageAfter (afterId: number, role: string | null = null, pageSize: number | null = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().pageAfter(afterId, requestParameters, pageSize)
    }

    listPageBefore (beforeId: number, role: string | null = null, pageSize: number | null = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    iterator () {
        return new Lister<User, UserJson>('/users', this.client, data => {
            const users = data.items.map(usersData => new User(usersData))
            return new Page(users, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
