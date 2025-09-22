import { Axios } from 'axios'
import { SeatsioClient } from '../SeatsioClient'
import { Lister } from '../Lister'
import { Page } from '../Page'
import { EventLogItem, EventLogItemJson } from './EventLogItem'

export class EventLog {
    client: Axios
    seatsioClient: SeatsioClient

    constructor (client: Axios, seatsioClient: SeatsioClient) {
        this.client = client
        this.seatsioClient = seatsioClient
    }

    listAll () {
        return this.iterator().all()
    }

    listFirstPage (pageSize: number | null = null) {
        return this.iterator().firstPage(null, pageSize)
    }

    listPageAfter (afterId: number, pageSize: number | null = null) {
        return this.iterator().pageAfter(afterId, null, pageSize)
    }

    listPageBefore (beforeId: number, pageSize: number | null = null) {
        return this.iterator().pageBefore(beforeId, null, pageSize)
    }

    iterator () {
        return new Lister<EventLogItem, EventLogItemJson>('/event-log', this.client, data => {
            const eventLogItems = data.items.map(json => new EventLogItem(json))
            return new Page(eventLogItems, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
