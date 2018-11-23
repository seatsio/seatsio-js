class BestAvailableObjects {
    /**
     * @param {string[]} objects
     * @param {Object.<string, {Labels}>} labels
     * @param {boolean} nextToEachOther
     */
    constructor(objects, labels, nextToEachOther) {
        this.objects = objects;
        this.labels = labels;
        this.nextToEachOther = nextToEachOther;
    }
}

module.exports = BestAvailableObjects;