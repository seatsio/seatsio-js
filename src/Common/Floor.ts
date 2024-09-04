export class Floor {
    private name: string
    private displayName: string

    constructor (name: string, displayName: string) {
        this.name = name
        this.displayName = displayName
    }

    getName () {
        return this.name
    }

    getDisplayName () {
        return this.displayName
    }
}
