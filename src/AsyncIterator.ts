import { Season, SeasonJson } from './Seasons/Season'
import { Chart, ChartJson } from './Charts/Chart'
import { Page } from './Page'
import { EventDeserializer } from './Events/EventDeserializer'
import { StatusChange, StatusChangeJson } from './Events/StatusChange'
import { Workspace, WorkspaceJson } from './Workspaces/Workspace'
import { User, UserJson } from './Users/User'
import { Event, EventJson } from './Events/Event'
import { Axios } from 'axios'
import { EventLogItem, EventLogItemJson } from './EventLog/EventLogItem'

export interface PaginatedJson<T> {
    items: T[]
    next_page_starts_after?: number
    previous_page_ends_before?: number
}

interface PaginationParams {
    start_after_id?: number
    end_before_id?: number
}

export class AsyncIterator<T> {
    client: Axios
    index: number
    items: T[]
    nextPageMustBeFetched: boolean
    nextPageStartsAfter?: number
    objType: string
    pages: Page<T>[]
    params: PaginationParams
    url: string

    constructor (url: string, client: Axios, objType: string, params = {}) {
        this.url = url
        this.client = client
        this.objType = objType
        this.params = params
        this.items = []
        this.pages = []
        this.index = 0
        this.nextPageMustBeFetched = true
    }

    charts (json: PaginatedJson<ChartJson>) {
        const charts: Chart[] = []
        json.items.forEach((chartData: ChartJson) => {
            const chart = new Chart(chartData)
            // @ts-ignore
            this.items.push(chart)
            charts.push(chart)
        })

        // @ts-ignore
        this.pages.push(new Page(charts, json.next_page_starts_after, json.previous_page_ends_before))
    }

    events (data: PaginatedJson<EventJson>) {
        const events: Event[] = []
        data.items.forEach((eventData: EventJson) => {
            const event = new EventDeserializer().fromJson(eventData)
            // @ts-ignore
            this.items.push(event)
            events.push(event)
        })
        // @ts-ignore
        this.pages.push(new Page(events, data.next_page_starts_after, data.previous_page_ends_before))
    }

    seasons (data: PaginatedJson<SeasonJson>) {
        const seasons: Season[] = []
        data.items.forEach((seasonData: SeasonJson) => {
            const season = new Season(seasonData)
            // @ts-ignore
            this.items.push(season)
            seasons.push(season)
        })
        // @ts-ignore
        this.pages.push(new Page(seasons, data.next_page_starts_after, data.previous_page_ends_before))
    }

    statusChanges (data: PaginatedJson<StatusChangeJson>) {
        const statusChanges: StatusChange[] = []
        data.items.forEach((statusData: StatusChangeJson) => {
            const statusChange = new StatusChange(statusData)
            // @ts-ignore
            this.items.push(statusChange)
            statusChanges.push(statusChange)
        })
        // @ts-ignore
        this.pages.push(new Page(statusChanges, data.next_page_starts_after, data.previous_page_ends_before))
    }

    workspaces (data: PaginatedJson<WorkspaceJson>) {
        const workspaces: Workspace[] = []
        data.items.forEach((json: WorkspaceJson) => {
            const workspace = new Workspace(json)
            // @ts-ignore
            this.items.push(workspace)
            workspaces.push(workspace)
        })
        // @ts-ignore
        this.pages.push(new Page(workspaces, data.next_page_starts_after, data.previous_page_ends_before))
    }

    eventLogItems (data: PaginatedJson<EventLogItemJson>) {
        const eventLogItems: EventLogItem[] = []
        data.items.forEach((json: EventLogItemJson) => {
            const eventLogItem = new EventLogItem(json)
            // @ts-ignore
            this.items.push(eventLogItem)
            eventLogItems.push(eventLogItem)
        })
        // @ts-ignore
        this.pages.push(new Page(eventLogItems, data.next_page_starts_after, data.previous_page_ends_before))
    }

    users (data: PaginatedJson<UserJson>) {
        const users: User[] = []
        data.items.forEach((userData: UserJson) => {
            const user = new User(userData)
            // @ts-ignore
            this.items.push(user)
            users.push(user)
        })
        // @ts-ignore
        this.pages.push(new Page(users, data.next_page_starts_after, data.previous_page_ends_before))
    }

    fetch (fetchParams = {}) {
        return this.client.get(this.url, { params: fetchParams })
            .then(res => {
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
                case 'users':
                    this.users(res.data)
                    break
                case 'workspaces':
                    this.workspaces(res.data)
                    break
                case 'eventLogItems':
                    this.eventLogItems(res.data)
                    break
                default:
                    throw new Error(`Unknown object type '${this.objType}'`)
                }
            })
    }

    [Symbol.asyncIterator] () {
        const _this = this

        return {
            async next (): Promise<any> {
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
