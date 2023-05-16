import { Workspace } from './Workspace'
import { Lister } from '../Lister'
import { Page } from '../Page'

export class Workspaces {
    client: any

    constructor (client: any) {
        this.client = client
    }

    create (name: any, isTest = false) {
        const requestParameters = { name, isTest }

        return this.client.post('/workspaces', requestParameters)
            .then((res: any) => new Workspace(res.data))
    }

    update (key: any, name: any) {
        const requestParameters = { name }

        return this.client.post(`/workspaces/${key}`, requestParameters)
    }

    setDefault (key: any) {
        const requestParameters = { key }
        return this.client.post(`/workspaces/actions/set-default/${key}`, requestParameters)
    }

    regenerateSecretKey (key: any) {
        return this.client.post(`/workspaces/${key}/actions/regenerate-secret-key`)
            .then((res: any) => res.data.secretKey)
    }

    activate (key: any) {
        return this.client.post(`/workspaces/${key}/actions/activate`)
    }

    deactivate (key: any) {
        return this.client.post(`/workspaces/${key}/actions/deactivate`)
    }

    retrieve (key: any) {
        return this.client.get(`/workspaces/${key}`).then((res: any) => new Workspace(res.data))
    }

    listAll (filter = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.iterator().all(requestParameters)
    }

    listFirstPage (filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().firstPage(requestParameters, pageSize)
    }

    listPageAfter (afterId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().pageAfter(afterId, requestParameters, pageSize)
    }

    listPageBefore (beforeId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    listActive (filter = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.activeWorkspacesIterator().all(requestParameters)
    }

    listActiveFirstPage (filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.activeWorkspacesIterator().firstPage(requestParameters, pageSize)
    }

    listActivePageAfter (afterId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.activeWorkspacesIterator().pageAfter(afterId, requestParameters, pageSize)
    }

    listActivePageBefore (beforeId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.activeWorkspacesIterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    listInactive (filter = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.inactiveWorkspacesIterator().all(requestParameters)
    }

    listInactiveFirstPage (filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.inactiveWorkspacesIterator().firstPage(requestParameters, pageSize)
    }

    listInactivePageAfter (afterId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.inactiveWorkspacesIterator().pageAfter(afterId, requestParameters, pageSize)
    }

    listInactivePageBefore (beforeId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.inactiveWorkspacesIterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    iterator () {
        return new Lister('/workspaces', this.client, 'workspaces', (data: any) => {
            const workspaces = data.items.map((json: any) => new Workspace(json))
            return new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    activeWorkspacesIterator () {
        return new Lister('/workspaces/active', this.client, 'workspaces', (data: any) => {
            const workspaces = data.items.map((json: any) => new Workspace(json))
            return new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    inactiveWorkspacesIterator () {
        return new Lister('/workspaces/inactive', this.client, 'workspaces', (data: any) => {
            const workspaces = data.items.map((json: any) => new Workspace(json))
            return new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
