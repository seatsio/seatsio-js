class ForSaleConfig {
    /**
     * @param {boolean} forSale
     * @param {string[]} objects
     * @param {object} areaPlaces
     * @param {string[]} categories
     */
    constructor (forSale, objects, areaPlaces, categories) {
        this.forSale = forSale
        this.areaPlaces = areaPlaces
        this.objects = objects
        this.categories = categories
    }
}

module.exports = ForSaleConfig
