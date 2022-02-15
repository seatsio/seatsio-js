const Page = require('./Page.js')
const StatusChange = require('./Events/StatusChange.js')
const Chart = require('./Charts/Chart.js')
const User = require('./Users/User.js')
const Subaccount = require('./Subaccounts/Subaccount.js')
const Workspace = require('./Workspaces/Workspace.js')
const Season = require('./Seasons/Season')
const EventDeserializer = require('./Events/EventDeserializer')

class AsyncIterator {
    /**
     * @param {string} url
     * @param {Axios} client
     * @param {string} objType
     * @param {object} params
     */
    constructor (url, client, objType, params = {}) {
        this.url = url
        this.client = client
        this.objType = objType
        this.params = params
        this.items = []
        this.pages = []
        this.index = 0
        this.nextPageMustBeFetched = true
    }

    charts (data) {
        const charts = []
        data.items.forEach((chartData) => {
            const chart = new Chart(chartData)
            this.items.push(chart)
            charts.push(chart)
        })

        this.pages.push(new Page(charts, data.next_page_starts_after, data.previous_page_ends_before))
    }

    events (data) {
        const events = []
        data.items.forEach(eventData => {
            const event = new EventDeserializer().fromJson(eventData)
            this.items.push(event)
            events.push(event)
        })
        this.pages.push(new Page(events, data.next_page_starts_after, data.previous_page_ends_before))
    }

    seasons (data) {
        const seasons = []
        data.items.forEach(seasonData => {
            const season = new Season(seasonData)
            this.items.push(season)
            seasons.push(season)
        })
        this.pages.push(new Page(seasons, data.next_page_starts_after, data.previous_page_ends_before))
    }

    statusChanges (data) {
        const statusChanges = []
        data.items.forEach((statusData) => {
            const status = new StatusChange(statusData)
            this.items.push(status)
            statusChanges.push(status)
        })
        this.pages.push(new Page(statusChanges, data.next_page_starts_after, data.previous_page_ends_before))
    }

    subaccounts (data) {
        const subaccounts = []
        data.items.forEach((subaccountData) => {
            const subaccount = new Subaccount(subaccountData)
            this.items.push(subaccount)
            subaccounts.push(subaccount)
        })
        this.pages.push(new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before))
    }

    workspaces (data) {
        const workspaces = []
        data.items.forEach((json) => {
            const workspace = new Workspace(json)
            this.items.push(workspace)
            workspaces.push(workspace)
        })
        this.pages.push(new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before))
    }

    users (data) {
        const users = []
        data.items.forEach((userData) => {
            const user = new User(userData)
            this.items.push(user)
            users.push(user)
        })
        this.pages.push(new Page(users, data.next_page_starts_after, data.previous_page_ends_before))
    }

    fetch (fetchParams = {}) {
        return this.client.get(this.url, { params: fetchParams })
            .then((res) => {
                if (res.data.next_page_starts_after) {
                    this.nextPageStartsAfter = res.data.next_page_starts_after
                    this.nextPageMustBeFetched = true
                } else {
                    this.nextPageMustBeFetched = false
                }

                switch (this.objType) {
                case 'charts':
                    this.charts(res.data)
                    break
                case 'events':
                    this.events(res.data)
                    break
                case 'seasons':
                    this.seasons(res.data)
                    break
                case 'statusChanges':
                    this.statusChanges(res.data)
                    break
                case 'subaccounts':
                    this.subaccounts(res.data)
                    break
                case 'users':
                    this.users(res.data)
                    break
                case 'workspaces':
                    this.workspaces(res.data)
                    break
                default:
                    throw new Error(`Unknown object type '${this.objType}'`)
                }
            })
    }

    [Symbol.asyncIterator] () {
        const _this = this

        return {
            async next () {
                if (_this.nextPageMustBeFetched && _this.items.length === 0) {
                    await _this.fetch(_this.params)
                } else if (_this.nextPageMustBeFetched && !_this.items[_this.index]) {
                    _this.params.start_after_id = _this.nextPageStartsAfter
                    await _this.fetch(_this.params)
                }
                if (!_this.items[_this.index]) {
                    return Promise.resolve({
                        done: true
                    })
                } else {
                    return Promise.resolve({ value: _this.items[_this.index++], done: false })
                }
            }
        }
    }
}

module.exports = AsyncIterator
