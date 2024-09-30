import { Dict } from '../Dict'

export type FloorInfoJson = Dict<any>

export class FloorInfo {
    name: string
    displayName:string

    constructor (name: string, displayName: string) {
        this.name = name
        this.displayName = displayName
    }

    static fromJson (json: FloorInfoJson) {
        if (json) {
            return new FloorInfo(json.name, json.displayName)
        }
        return undefined
    }
}
