import { AbstractEventParams } from './AbstractEventParams'
import { Channel } from './Channel'

export class CreateEventParams extends AbstractEventParams {
    channels?: Channel[]

    withChannels (channels: Channel[]) {
        this.channels = channels
        return this
    }
}
