import axios, { Axios, type AxiosRequestConfig, type RawAxiosRequestHeaders } from 'axios'
import { Accounts } from './Accounts/Accounts'
import { Charts } from './Charts/Charts'
import { errorResponseHandler } from './errorInterceptor'
import { EventLog } from './EventLog/EventLog'
import { Events } from './Events/Events'
import { HoldTokens } from './HoldTokens/HoldTokens'
import { Region } from './Region'
import { ChartReports } from './Reports/ChartReports'
import { EventReports } from './Reports/EventReports'
import { UsageReports } from './Reports/UsageReports'
import { Seasons } from './Seasons/Seasons'
import { TicketBuyers } from './TicketBuyers/TicketBuyers'
import { Workspaces } from './Workspaces/Workspaces'

const TEN_SECONDS = 10000

export class SeatsioClient {
    accounts: Accounts
    chartReports: ChartReports
    charts: Charts
    client: Axios
    errInterceptor: number
    eventReports: EventReports
    events: Events
    holdTokens: HoldTokens
    requestListener: any
    seasons: Seasons
    usageReports: UsageReports
    workspaces: Workspaces
    eventLog: EventLog
    ticketBuyers: TicketBuyers

    constructor (region: Region, secretKey: string, workspaceKey: string | undefined = undefined, extraHeaders: RawAxiosRequestHeaders = {}) {
        this.client = axios.create(this._axiosConfig(region.url, secretKey, workspaceKey, extraHeaders))

        this._setupRequestListenerInterceptors()
        this.setMaxRetries(5)
        this.client.interceptors.response.use((response: any) => response, exponentialBackoffInterceptor(this.client))
        this.errInterceptor = this.client.interceptors.response.use((response: any) => response, errorResponseHandler)

        this.charts = new Charts(this.client)
        this.events = new Events(this.client)
        this.workspaces = new Workspaces(this.client)
        this.holdTokens = new HoldTokens(this.client)
        this.accounts = new Accounts(this.client)
        this.chartReports = new ChartReports(this.client)
        this.eventReports = new EventReports(this.client)
        this.usageReports = new UsageReports(this.client)
        this.seasons = new Seasons(this.client, this)
        this.eventLog = new EventLog(this.client, this)
        this.ticketBuyers = new TicketBuyers(this.client, this)
    }

    _axiosConfig (baseUrl: string, secretKey: string, workspaceKey: string | undefined, extraHeaders: RawAxiosRequestHeaders) {
        const headers: RawAxiosRequestHeaders = {
            ...extraHeaders,
            'X-Client-Lib': 'js',
            ...(workspaceKey ? { 'X-Workspace-Key': workspaceKey } : {})
        }

        const config: AxiosRequestConfig = {
            baseURL: baseUrl,
            auth: {
                username: secretKey,
                password: ''
            },
            headers,
            timeout: TEN_SECONDS,
            paramsSerializer: {
                indexes: null
            }
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
    return (error: any) => {
        if (error.response?.status !== 429) {
            return Promise.reject(error)
        }

        const config = error.config
        if (!config) {
            return Promise.reject(error)
        }

        config.__retryCount = config.__retryCount || 0
        if (config.__retryCount >= axios.maxRetries) {
            return Promise.reject(error)
        }

        const backoff = new Promise<void>(resolve => {
            const waitTime = Math.pow(2, config.__retryCount + 2) * 100
            config.__retryCount++
            setTimeout(() => resolve(), waitTime)
        })

        return backoff.then(() => axios.request(config))
    }
}
