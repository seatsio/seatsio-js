class Labels {
    constructor(own, parent = null) {
        /* LabelAndType */
        this.own = own;
        /* LabelAndType */
        parent ? this.parent = parent : {};
    }
}

class LabelAndType {
    constructor(label, type) {
        /* string */
        this.type = type;
        /* string */
        this.label = label;
    }
}

class Entrance {
    constructor(label) {
        /* string */
        this.label = label;
    }
}

module.exports = {
    Labels: Labels,
    LabelAndType: LabelAndType,
    Entrance: Entrance
};
