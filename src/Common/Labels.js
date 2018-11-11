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
        this.label = label;
        /* string */
        this.type = type;
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
