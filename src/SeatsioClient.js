const Accounts = require('./Accounts/Accounts.js')
const Users = require('./Users/Users.js')
const Invitations = require('./Invitations/Invitations.js')
const Charts = require('./Charts/Charts.js')
const Events = require('./Events/Events.js')
const Subaccounts = require('./Subaccounts/Subaccounts.js')
const Workspaces = require('./Workspaces/Workspaces.js')
const HoldTokens = require('./HoldTokens/HoldTokens.js')
const ChartReports = require('./Reports/ChartReports.js')
const EventReports = require('./Reports/EventReports.js')
const UsageReports = require('./Reports/UsageReports.js')
const errorResponseHandler = require('./errorInterceptor.js')
const Axios = require('axios')
const Seasons = require('./Seasons/Seasons')

class SeatsioClient {
    constructor (region, secretKey, workspaceKey = null, extraHeaders = {}) {
        this.client = Axios.create(this._axiosConfig(region.url, secretKey, workspaceKey, extraHeaders))

        this._setupRequestListenerInterceptors()
        this.client.maxRetries = 5
        this.client.interceptors.response.use(response => response, exponentialBackoffInterceptor(this.client))
        this.errInterceptor = this.client.interceptors.response.use(response => response, errorResponseHandler)

        this.charts = new Charts(this.client)
        this.events = new Events(this.client, this)
        this.subaccounts = new Subaccounts(this.client)
        this.workspaces = new Workspaces(this.client)
        this.users = new Users(this.client)
        this.invitations = new Invitations(this.client)
        this.holdTokens = new HoldTokens(this.client)
        this.accounts = new Accounts(this.client)
        this.chartReports = new ChartReports(this.client)
        this.eventReports = new EventReports(this.client)
        this.usageReports = new UsageReports(this.client)
        this.seasons = new Seasons(this.client, this)
    }

    _axiosConfig (baseUrl, secretKey, workspaceKey, extraHeaders) {
        const config = {
            baseURL: baseUrl,
            auth: {
                username: secretKey,
                password: null
            },
            headers: extraHeaders,
            errorHandle: false
        }

        if (workspaceKey) {
            config.headers['X-Workspace-Key'] = workspaceKey
        }

        return config
    }

    _setupRequestListenerInterceptors () {
        this.client.interceptors.request.use(config => {
            if (this.requestListener) {
                config.listener = this.requestListener()
                config.listener.onRequestStarted()
            }
            return config
        })

        this.client.interceptors.response.use(
            response => {
                if (response.config.listener) {
                    response.config.listener.onRequestEnded()
                }
                return response
            },
            response => {
                if (response.config.listener) {
                    response.config.listener.onRequestEnded()
                }
                return Promise.reject(response)
            }
        )
    }

    setRequestListener (requestListener) {
        this.requestListener = requestListener
        return this
    }

    setMaxRetries (maxRetries) {
        this.client.maxRetries = maxRetries
        return this
    }
}

function exponentialBackoffInterceptor (axios) {
    return response => {
        if (response.response.status !== 429) {
            return Promise.reject(response)
        }

        const config = response.config
        if (!config) {
            return Promise.reject(response)
        }

        config.__retryCount = config.__retryCount || 0
        if (config.__retryCount >= axios.maxRetries) {
            return Promise.reject(response)
        }

        const backoff = new Promise(resolve => {
            const waitTime = Math.pow(2, config.__retryCount + 2) * 100
            config.__retryCount++
            setTimeout(() => resolve(), waitTime)
        })

        return backoff.then(() => axios(config))
    }
}

module.exports = SeatsioClient
