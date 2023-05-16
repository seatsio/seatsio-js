export class ForSaleConfig {
    areaPlaces: any
    categories: any
    forSale: any
    objects: any

    constructor (forSale: any, objects: any, areaPlaces: any, categories: any) {
        this.forSale = forSale
        this.areaPlaces = areaPlaces
        this.objects = objects
        this.categories = categories
    }
}
