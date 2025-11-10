import { AbstractEventParams } from './AbstractEventParams'
import { LocalDate } from '../LocalDate'

export class UpdateEventParams extends AbstractEventParams {
    isInThePast?: boolean
    date?: LocalDate

    withIsInThePast (isInThePast: boolean) {
        this.isInThePast = isInThePast
        return this
    }

    withDate (date: LocalDate) {
        this.date = date
        return this
    }
}
