export class Category {
    accessible: any
    color: any
    key: any
    label: any

    constructor (key: any, label: any, color: any, accessible = false) {
        this.key = key
        this.label = label
        this.color = color
        this.accessible = accessible
    }

    setKey (key: any) {
        this.key = key
        return this
    }

    setLabel (label: any) {
        this.label = label
        return this
    }

    setColor (color: any) {
        this.color = color
        return this
    }

    setAccessible (accessible: any) {
        this.accessible = accessible
        return this
    }

    static fromJson (json: any) {
        return new Category(json.key, json.label, json.color, json.accessible)
    }
}
