import { AbstractEventParams } from './AbstractEventParams'
import { Channel } from './Channel'
import { ForSaleConfig } from './ForSaleConfig'

export class CreateEventParams extends AbstractEventParams {
    channels?: Channel[]
    forSaleConfig?: ForSaleConfig

    withChannels (channels: Channel[]) {
        this.channels = channels
        return this
    }

    withForSaleConfig (forSaleConfig: ForSaleConfig) {
        this.forSaleConfig = forSaleConfig
        return this
    }
}
