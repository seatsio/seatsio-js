import { AbstractEventParams } from './AbstractEventParams'
import { ChannelCreationParams } from './Channel'
import { ForSaleConfig } from './ForSaleConfig'
import { LocalDate } from '../LocalDate'

export class CreateEventParams extends AbstractEventParams {
    channels?: ChannelCreationParams[]
    forSaleConfig?: ForSaleConfig
    date?: LocalDate

    withChannels (channels: ChannelCreationParams[]) {
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
