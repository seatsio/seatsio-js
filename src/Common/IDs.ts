export class IDs {
    own: string
    parent: string | null
    section: string | null

    constructor (own: string, parent: string | null = null, section: string | null = null) {
        this.own = own
        this.parent = parent
        this.section = section
    }
}
