import { AbstractEventParams } from '../Events/AbstractEventParams.js'

export class UpdateSeasonParams extends AbstractEventParams {
    forSalePropagated?: boolean

    withForSalePropagated (forSalePropagated: boolean) {
        this.forSalePropagated = forSalePropagated
        return this
    }
}
