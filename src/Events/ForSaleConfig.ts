import { Dict } from '../Dict'

export class ForSaleConfig {
    areaPlaces: Dict<number>
    categories: string[]
    forSale: boolean
    objects: string[]

    constructor (forSale: boolean, objects: string[], areaPlaces: Dict<number>, categories: string[]) {
        this.forSale = forSale
        this.areaPlaces = areaPlaces
        this.objects = objects
        this.categories = categories
    }

    static fromJson (json: any) {
        return new ForSaleConfig(json.forSale, json.objects, json.areaPlaces, json.categories)
    }
}
