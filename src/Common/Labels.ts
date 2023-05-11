export class Labels {
    /**
     * @param {LabelAndType} own
     * @param {?LabelAndType} parent
     */
    constructor (own, parent = null) {
        this.own = own
        this.parent = parent || {}
    }
}

export class LabelAndType {
    /**
     * @param {string} label
     * @param {string} type
     */
    constructor (label, type) {
        this.label = label
        this.type = type
    }
}
