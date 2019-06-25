class Labels {
    /**
     * @param {LabelAndType} own
     * @param {?LabelAndType} parent
     */
    constructor (own, parent = null) {
        this.own = own
        this.parent = parent || {}
    }
}

class LabelAndType {
    /**
     * @param {string} label
     * @param {string} type
     */
    constructor (label, type) {
        this.label = label
        this.type = type
    }
}

module.exports = {
    Labels: Labels,
    LabelAndType: LabelAndType
}
