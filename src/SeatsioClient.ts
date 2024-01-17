import { Accounts } from './Accounts/Accounts'
import { Users } from './Users/Users'
import { Invitations } from './Invitations/Invitations'
import { Charts } from './Charts/Charts'
import { Events } from './Events/Events'
import { Workspaces } from './Workspaces/Workspaces'
import { HoldTokens } from './HoldTokens/HoldTokens'
import { ChartReports } from './Reports/ChartReports'
import { EventReports } from './Reports/EventReports'
import { UsageReports } from './Reports/UsageReports'
import { errorResponseHandler } from './errorInterceptor'
import { Seasons } from './Seasons/Seasons'
import { Region } from './Region'
import axios, { Axios } from 'axios'
import { EventLog } from './EventLog/EventLog'

export class SeatsioClient {
    accounts: Accounts
    chartReports: ChartReports
    charts: Charts
    client: Axios
    errInterceptor: number
    eventReports: EventReports
    events: Events
    holdTokens: HoldTokens
    invitations: Invitations
    requestListener: any
    seasons: Seasons
    usageReports: UsageReports
    users: Users
    workspaces: Workspaces
    eventLog: EventLog

    constructor (region: Region, secretKey?: string, workspaceKey: string | undefined = undefined, extraHeaders: object = {}) {
        // @ts-expect-error TS(2345): Argument of type '{ baseURL: string; auth: { username... Remove this comment to see the full error message
        this.client = axios.create(this._axiosConfig(region.url, secretKey, workspaceKey, extraHeaders))

        this._setupRequestListenerInterceptors()
        // @ts-ignore
        this.client.maxRetries = 5
        this.client.interceptors.response.use((response: any) => response, exponentialBackoffInterceptor(this.client))
        this.errInterceptor = this.client.interceptors.response.use((response: any) => response, errorResponseHandler)

        this.charts = new Charts(this.client)
        this.events = new Events(this.client)
        this.workspaces = new Workspaces(this.client)
        this.users = new Users(this.client)
        this.invitations = new Invitations(this.client)
        this.holdTokens = new HoldTokens(this.client)
        this.accounts = new Accounts(this.client)
        this.chartReports = new ChartReports(this.client)
        this.eventReports = new EventReports(this.client)
        this.usageReports = new UsageReports(this.client)
        this.seasons = new Seasons(this.client, this)
        this.eventLog = new EventLog(this.client, this)
    }

    _axiosConfig (baseUrl: string, secretKey: string, workspaceKey: string, extraHeaders: any) {
        const config = {
            baseURL: baseUrl,
            auth: {
                username: secretKey,
                password: null
            },
            headers: extraHeaders,
            errorHandle: false
        }

        config.headers['X-Client-Lib'] = 'js'
        if (workspaceKey) {
            config.headers['X-Workspace-Key'] = workspaceKey
        }

        return config
    }

    _setupRequestListenerInterceptors () {
        this.client.interceptors.request.use((config: any) => {
            if (this.requestListener) {
                config.listener = this.requestListener()
                config.listener.onRequestStarted()
            }
            return config
        })

        this.client.interceptors.response.use(
            (response: any) => {
                if (response.config.listener) {
                    response.config.listener.onRequestEnded()
                }
                return response
            },
            (response: any) => {
                if (response.config.listener) {
                    response.config.listener.onRequestEnded()
                }
                return Promise.reject(response)
            }
        )
    }

    setRequestListener (requestListener: any) {
        this.requestListener = requestListener
        return this
    }

    setMaxRetries (maxRetries: number) {
        // @ts-ignore
        this.client.maxRetries = maxRetries
        return this
    }
}

function exponentialBackoffInterceptor (axios: any) {
    return (response: any) => {
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
            // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
            setTimeout(() => resolve(), waitTime)
        })

        return backoff.then(() => axios(config))
    }
}
