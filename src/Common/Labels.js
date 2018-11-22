class Labels {
    /**
     * @param {LabelAndType} own
     * @param {?LabelAndType} parent
     */
    constructor(own, parent = null) {
        this.own = own;
        parent ? this.parent = parent : {};
    }
}

class LabelAndType {
    /**
     * @param {string} label
     * @param {string} type
     */
    constructor(label, type) {
        this.label = label;
        this.type = type;
    }
}

class Entrance {
    /**
     * @param {string} label
     */
    constructor(label) {
        this.label = label;
    }
}

module.exports = {
    Labels: Labels,
    LabelAndType: LabelAndType,
    Entrance: Entrance
};
