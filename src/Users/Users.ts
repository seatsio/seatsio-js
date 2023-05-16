import { Invitation } from '../Invitations/Invitation'
import { Page } from '../Page'
import { User } from './User'
import { Lister } from '../Lister'

export class Users {
    client: any

    constructor (client: any) {
        this.client = client
    }

    invite (email: any, role: any, workspaces = undefined) {
        const requestParameters = { email, role, workspaces }

        return this.client.post('/users/actions/invite', requestParameters)
            .then((res: any) => new Invitation(res.data))
    }

    retrieve (id: any) {
        return this.client.get(`/users/${id}`).then((res: any) => new User(res.data))
    }

    activate (id: any) {
        return this.client.post(`/users/${id}/actions/activate`)
    }

    deactivate (id: any) {
        return this.client.post(`/users/${id}/actions/deactivate`)
    }

    listAll (role = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().all(requestParameters)
    }

    listFirstPage (role = null, pageSize = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().firstPage(requestParameters, pageSize)
    }

    listPageAfter (afterId: any, role = null, pageSize = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().pageAfter(afterId, requestParameters, pageSize)
    }

    listPageBefore (beforeId: any, role = null, pageSize = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    iterator () {
        return new Lister('/users', this.client, 'users', (data: any) => {
            const users = data.items.map((usersData: any) => new User(usersData))
            return new Page(users, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
