import { Dict } from '../Dict'

type StatusChangeOriginJson = Dict<any>

export class StatusChangeOrigin {
    type: string
    ip: string

    constructor (json: StatusChangeOriginJson) {
        this.type = json.type
        this.ip = json.ip
    }
}
