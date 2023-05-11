export class Labels {
    own: any;
    parent: any;
    /**
     * @param {LabelAndType} own
     * @param {?LabelAndType} parent
     */
    constructor (own: any, parent = null) {
        this.own = own
        this.parent = parent || {}
    }
}

export class LabelAndType {
    label: any;
    type: any;
    /**
     * @param {string} label
     * @param {string} type
     */
    constructor (label: any, type: any) {
        this.label = label
        this.type = type
    }
}
