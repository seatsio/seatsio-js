import { AbstractEventParams } from './AbstractEventParams'

export class UpdateEventParams extends AbstractEventParams {
    isInThePast?: boolean

    withIsInThePast (isInThePast: boolean) {
        this.isInThePast = isInThePast
        return this
    }
}
