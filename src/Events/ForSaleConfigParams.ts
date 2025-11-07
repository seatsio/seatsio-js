import { ObjectAndQuantity } from './Events'

export class ForSaleConfigParams {
    forSale?: ObjectAndQuantity[]
    notForSale?: ObjectAndQuantity[]

    withForSale (forSale: ObjectAndQuantity[]) {
        this.forSale = forSale
        return this
    }

    withNotForSale (notForSale: ObjectAndQuantity[]) {
        this.notForSale = notForSale
        return this
    }
}
