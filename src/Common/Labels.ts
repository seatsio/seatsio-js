export class Labels {
    own: any
    parent: any
    private section?: any

    constructor (own: any, parent: any = null) {
        this.own = own
        this.parent = parent || {}
    }

    setSection (value: any) {
        this.section = value
    }

    getSection () {
        return this.section
    }
}

export class LabelAndType {
    label: any
    type: any

    constructor (label: any, type: any) {
        this.label = label
        this.type = type
    }
}
