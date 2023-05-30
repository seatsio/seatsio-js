import { Dict } from '../Dict'

export type CategoryJson = Dict<any>
export type CategoryKey = string | number

export class Category {
    accessible: boolean
    color: string
    key: CategoryKey
    label: string

    constructor (key: string | number, label: string, color: string, accessible: boolean) {
        this.key = key
        this.label = label
        this.color = color
        this.accessible = accessible
    }

    setKey (key: string | number) {
        this.key = key
        return this
    }

    setLabel (label: string) {
        this.label = label
        return this
    }

    setColor (color: string) {
        this.color = color
        return this
    }

    setAccessible (accessible: boolean) {
        this.accessible = accessible
        return this
    }

    static fromJson (json: CategoryJson) {
        return new Category(json.key, json.label, json.color, json.accessible)
    }
}
