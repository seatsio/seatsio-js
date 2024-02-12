import { Dict } from '../Dict'

export type EventLogItemJson = Dict<any>

export class EventLogItem {
    id: number
    type: string
    timestamp: Date
    data?: Dict<any>

    constructor (json: EventLogItemJson) {
        this.id = json.id
        this.type = json.type
        this.timestamp = new Date(json.date)
        this.data = json.data
    }
}
