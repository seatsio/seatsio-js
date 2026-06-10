import { AbstractEventParams } from './AbstractEventParams.js'
import { ChannelCreationParams } from './Channel.js'
import { ForSaleConfig } from './ForSaleConfig.js'
import { LocalDate } from '../LocalDate.js'

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
