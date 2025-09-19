import { Axios } from 'axios'
import { SeatsioClient } from '../SeatsioClient'
import { Dict } from '../Dict'
import { AddTicketBuyerIdsResponse } from './AddTicketBuyerIdsResponse'
import { RemoveTicketBuyerIdsResponse } from './RemoveTicketBuyerIdsResponse'
import { Lister } from '../Lister'
import { Page } from '../Page'

export class TicketBuyers {
    client: Axios
    seatsioClient: SeatsioClient

    constructor (client: Axios, seatsioClient: SeatsioClient) {
        this.client = client
        this.seatsioClient = seatsioClient
    }

    async add (ids: string[]) {
        const request: Dict<any> = {}
        request.ids = ids.filter((s) => s !== null && s !== undefined)
        return this.client.post('/ticket-buyers', request)
            .then(response => new AddTicketBuyerIdsResponse(response.data))
    }

    async remove (ids: string[]): Promise<RemoveTicketBuyerIdsResponse> {
        const request: Dict<any> = {
            ids: ids.filter((id) => id !== null && id !== undefined)
        }

        return this.client.delete(
            '/ticket-buyers',
            { data: request }
        ).then(response => new RemoveTicketBuyerIdsResponse(response.data))
    }

    listAll () {
        return this.iterator().all()
    }

    iterator (): Lister<string, string> {
        return new Lister<string, string>('/ticket-buyers', this.client, data => {
            return new Page<string>(data.items, data.next_page_starts_after, data.previous_page_ends_before)
        })
    }
}
