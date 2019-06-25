class ForSaleConfig {
    /**
     * @param {boolean} forSale
     * @param {string[]} objects
     * @param {string[]} categories
     */
    constructor (forSale, objects, categories) {
        this.forSale = forSale
        this.objects = objects
        this.categories = categories
    }
}

module.exports = ForSaleConfig
