const Page = require('../Page.js')
const Lister = require('../Lister.js')
const User = require('./User.js')

class Users {
    /**
     * @param {Axios} client
     */
    constructor (client) {
        this.client = client
    }

    /**
     * @param {string} email
     * @param {string} role
     * @param {?string[]} workspaces
     * @returns {Promise<User>}
     */
    invite (email, role, workspaces = undefined) {
        const requestParameters = { email, role, workspaces }

        return this.client.post('/users/actions/invite', requestParameters)
    }

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    retrieve (id) {
        return this.client.get(`/users/${id}`)
            .then((res) => new User(res.data))
    }

    /**
     * @param {number} id
     * @returns {Promise}
     */
    activate (id) {
        return this.client.post(`/users/${id}/actions/activate`)
    }

    /**
     * @param {number} id
     * @returns {Promise}
     */
    deactivate (id) {
        return this.client.post(`/users/${id}/actions/deactivate`)
    }

    /**
     * @returns {AsyncIterator}
     */
    listAll (role = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().all(requestParameters)
    }

    /**
     * @returns {Page}
     */
    listFirstPage (role = null, pageSize = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().firstPage(requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listPageAfter (afterId, role = null, pageSize = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().pageAfter(afterId, requestParameters, pageSize)
    }

    /**
     * @returns {Page}
     */
    listPageBefore (beforeId, role = null, pageSize = null) {
        const requestParameters = role !== null ? { role } : {}
        return this.iterator().pageBefore(beforeId, requestParameters, pageSize)
    }

    /**
     * @returns {Lister}
     */
    iterator () {
        return new Lister('/users', this.client, 'users', (data) => {
            const users = data.items.map((usersData) => new User(usersData))
            return new Page(users, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}

module.exports = Users
