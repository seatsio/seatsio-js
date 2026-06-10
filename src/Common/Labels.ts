import { LabelAndType } from './LabelAndType.js'

export class Labels {
    own: LabelAndType
    parent: LabelAndType | null
    private section?: string

    constructor (own: LabelAndType, parent?: LabelAndType) {
        this.own = own
        this.parent = parent || null
    }

    setSection (value: string) {
        this.section = value
    }

    getSection () {
        return this.section
    }
}
