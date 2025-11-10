import { AbstractEventParams } from './AbstractEventParams'
import { Channel } from './Channel'
import { ForSaleConfig } from './ForSaleConfig'
import { LocalDate } from '../LocalDate'

export class CreateEventParams extends AbstractEventParams {
    channels?: Channel[]
    forSaleConfig?: ForSaleConfig
    date?: LocalDate

    withChannels (channels: Channel[]) {
        this.channels = channels
        return this
    }

    withForSaleConfig (forSaleConfig: ForSaleConfig) {
        this.forSaleConfig = forSaleConfig
        return this
    }

    withDate (date: LocalDate) {
        this.date = date
        return this
    }
}
