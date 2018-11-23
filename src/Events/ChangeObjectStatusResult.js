class ChangeObjectStatusResult {
    /**
     * @param {Object.<string, {Labels}>} labels
     */
    constructor(labels) {
        this.labels = labels;
    }
}

module.exports = ChangeObjectStatusResult;