import { Workspace, WorkspaceJson } from './Workspace'
import { Lister } from '../Lister'
import { Page } from '../Page'
import { Axios } from 'axios'

export class Workspaces {
    client: Axios

    constructor (client: Axios) {
        this.client = client
    }

    create (name: string, isTest = false) {
        const requestParameters = { name, isTest }

        return this.client.post('/workspaces', requestParameters)
            .then(res => new Workspace(res.data))
    }

    update (key: string, name: string) {
        const requestParameters = { name }

        return this.client.post(`/workspaces/${key}`, requestParameters)
    }

    setDefault (key: string) {
        const requestParameters = { key }
        return this.client.post(`/workspaces/actions/set-default/${key}`, requestParameters)
    }

    regenerateSecretKey (key: string) {
        return this.client.post(`/workspaces/${key}/actions/regenerate-secret-key`)
            .then(res => res.data.secretKey)
    }

    activate (key: string) {
        return this.client.post(`/workspaces/${key}/actions/activate`)
    }

    deactivate (key: string) {
        return this.client.post(`/workspaces/${key}/actions/deactivate`)
    }

    delete (key: string) {
        return this.client.delete(`/workspaces/${key}`)
    }

    retrieve (key: string) {
        return this.client.get(`/workspaces/${key}`).then(res => new Workspace(res.data))
    }

    listAll (filter: string | null = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.iterator().all(requestParameters)
    }

    listFirstPage (filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().firstPage(requestParameters, pageSize)
    }

    listPageAfter (afterId: number, filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().pageAfter(afterId, requestParameters, pageSize)
    }

    listPageBefore (beforeId: number, filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.iterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    listActive (filter: string | null = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.activeWorkspacesIterator().all(requestParameters)
    }

    listActiveFirstPage (filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.activeWorkspacesIterator().firstPage(requestParameters, pageSize)
    }

    listActivePageAfter (afterId: number, filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.activeWorkspacesIterator().pageAfter(afterId, requestParameters, pageSize)
    }

    listActivePageBefore (beforeId: number, filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.activeWorkspacesIterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    listInactive (filter: string | null = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.inactiveWorkspacesIterator().all(requestParameters)
    }

    listInactiveFirstPage (filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.inactiveWorkspacesIterator().firstPage(requestParameters, pageSize)
    }

    listInactivePageAfter (afterId: number, filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.inactiveWorkspacesIterator().pageAfter(afterId, requestParameters, pageSize)
    }

    listInactivePageBefore (beforeId: number, filter: string | null = null, pageSize: number | null = null) {
        const requestParameters = filter !== null ? { filter } : null
        return this.inactiveWorkspacesIterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    iterator () {
        return new Lister<Workspace, WorkspaceJson>('/workspaces', this.client, 'workspaces', data => {
            const workspaces = data.items.map(json => new Workspace(json))
            return new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    activeWorkspacesIterator () {
        return new Lister<Workspace, WorkspaceJson>('/workspaces/active', this.client, 'workspaces', data => {
            const workspaces = data.items.map(json => new Workspace(json))
            return new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }

    inactiveWorkspacesIterator () {
        return new Lister<Workspace, WorkspaceJson>('/workspaces/inactive', this.client, 'workspaces', data => {
            const workspaces = data.items.map(json => new Workspace(json))
            return new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
