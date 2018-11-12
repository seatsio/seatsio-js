class ForSaleConfig {
    constructor(forSale, objects, categories) {
        /* boolean */
        this.forSale = forSale;
        /* [string] */
        this.objects = objects;
        /* [string] */
        this.categories = categories;
    }
}

module.exports = ForSaleConfig;