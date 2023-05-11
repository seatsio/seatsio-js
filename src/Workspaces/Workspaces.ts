import { Page } from '../Page.js'
import { Lister } from '../Lister.js'
import { Workspace } from './Workspace.js'

export class Workspaces {
    client: any;
    /**
     * @param {Axios} client
     */
    constructor (client: any) {
        this.client = client
    }

    /**
     * @param {string} name
     * @param {boolean} isTest
     * @returns {Promise<Workspace>} Promise object that will resolve to a Workspace object
     */
    create (name: any, isTest = false) {
        const requestParameters = { name, isTest }

        return this.client.post('/workspaces', requestParameters)
            .then((res: any) => new Workspace(res.data));
    }

    /**
     * @param {string} key
     * @param {string} name
     */
    update (key: any, name: any) {
        const requestParameters = { name }

        return this.client.post(`/workspaces/${key}`, requestParameters)
    }

    /**
     * @param {string} key
     */
    setDefault (key: any) {
        const requestParameters = { key }
        return this.client.post(`/workspaces/actions/set-default/${key}`, requestParameters)
    }

    /**
     * @param {string} key
     */
    regenerateSecretKey (key: any) {
        return this.client.post(`/workspaces/${key}/actions/regenerate-secret-key`)
            .then((res: any) => res.data.secretKey);
    }

    /**
     * @param {string} key
     */
    activate (key: any) {
        return this.client.post(`/workspaces/${key}/actions/activate`)
    }

    /**
     * @param {string} key
     */
    deactivate (key: any) {
        return this.client.post(`/workspaces/${key}/actions/deactivate`)
    }

    /**
     * @param {string} key
     * @returns {Promise<Workspace>} Promise object that will resolve to a Workspace object
     */
    retrieve (key: any) {
        return this.client.get(`/workspaces/${key}`).then((res: any) => new Workspace(res.data));
    }

    /**
     * @returns {AsyncIterator}
     */
    listAll (filter = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.iterator().all(requestParameters)
    }

    /**
     * @returns {Page}
     */
    listFirstPage (filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.iterator().firstPage(requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listPageAfter (afterId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.iterator().pageAfter(afterId, requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listPageBefore (beforeId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.iterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    /**
     * @returns {AsyncIterator}
     */
    listActive (filter = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.activeWorkspacesIterator().all(requestParameters)
    }

    /**
     * @returns {Page}
     */
    listActiveFirstPage (filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.activeWorkspacesIterator().firstPage(requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listActivePageAfter (afterId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.activeWorkspacesIterator().pageAfter(afterId, requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listActivePageBefore (beforeId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.activeWorkspacesIterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    /**
     * @returns {AsyncIterator}
     */
    listInactive (filter = null) {
        const requestParameters = filter !== null ? { filter } : {}
        return this.inactiveWorkspacesIterator().all(requestParameters)
    }

    /**
     * @returns {Page}
     */
    listInactiveFirstPage (filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.inactiveWorkspacesIterator().firstPage(requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listInactivePageAfter (afterId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.inactiveWorkspacesIterator().pageAfter(afterId, requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listInactivePageBefore (beforeId: any, filter = null, pageSize = null) {
        const requestParameters = filter !== null ? { filter } : null
        // @ts-expect-error TS(2345): Argument of type '{ filter: never; } | null' is no... Remove this comment to see the full error message
        return this.inactiveWorkspacesIterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    /**
     * @returns {Lister}
     */
    iterator () {
        return new Lister('/workspaces', this.client, 'workspaces', (data: any) => {
            const workspaces = data.items.map((json: any) => new Workspace(json))
            return new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before)
        });
    }

    /**
     * @returns {Lister}
     */
    activeWorkspacesIterator () {
        return new Lister('/workspaces/active', this.client, 'workspaces', (data: any) => {
            const workspaces = data.items.map((json: any) => new Workspace(json))
            return new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before)
        });
    }

    /**
     * @returns {Lister}
     */
    inactiveWorkspacesIterator () {
        return new Lister('/workspaces/inactive', this.client, 'workspaces', (data: any) => {
            const workspaces = data.items.map((json: any) => new Workspace(json))
            return new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before)
        });
    }
}
