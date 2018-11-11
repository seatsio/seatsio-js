class ChartReportItem {
    constructor(label, labels, categoryLabel, categoryKey, entrance, objectType, section, capacity) {
        /* string */
        this.label = label;
        /* Common/Label */
        this.labels = labels;
        /* string */
        this.categoryLabel = categoryLabel;
        /* string */
        this.categoryKey = categoryKey;
        /* string */
        this.entrance = entrance;
        /* string */
        this.objectType = objectType;
        /* string */
        this.section = section;
        /* int */
        this.capacity = capacity;
    }
}

module.exports = ChartReportItem;

