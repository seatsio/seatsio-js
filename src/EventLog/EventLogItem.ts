import { Dict } from '../Dict'

export type EventLogItemJson = Dict<any>

export class EventLogItem {
    id: number
    type: string
    workspaceKey: string
    date: Date
    data?: Dict<any>

    constructor (json: EventLogItemJson) {
        this.id = json.id
        this.type = json.type
        this.workspaceKey = json.workspaceKey
        this.date = new Date(json.date)
        this.data = json.data
    }
}
