import { ObjectOrObjects } from './Events'
import { StatusChangeType } from './StatusChangeType'

export class StatusChangeRequest {
    type: StatusChangeType = StatusChangeType.CHANGE_STATUS_TO
    eventKey: string | null = null
    objectOrObjects: ObjectOrObjects | null = null
    status: string | null = null
    holdToken: string | null = null
    orderId: string | null = null
    keepExtraData: boolean | null = null
    ignoreChannels: boolean | null = null
    channelKeys: string[] | null = null
    allowedPreviousStatuses: string[] | null = null
    rejectedPreviousStatuses: string[] | null = null

    withType (type: StatusChangeType) {
        this.type = type
        return this
    }

    withEventKey (eventKey: string) {
        this.eventKey = eventKey
        return this
    }

    withObjects (objectOrObjects: ObjectOrObjects) {
        this.objectOrObjects = objectOrObjects
        return this
    }

    withStatus (status: string) {
        this.status = status
        return this
    }

    withHoldToken (holdToken: string) {
        this.holdToken = holdToken
        return this
    }

    withOrderId (orderId: string) {
        this.orderId = orderId
        return this
    }

    withKeepExtraData (keepExtraData: boolean) {
        this.keepExtraData = keepExtraData
        return this
    }

    withIgnoreChannels (ignoreChannels: boolean) {
        this.ignoreChannels = ignoreChannels
        return this
    }

    withChannelKeys (channelKeys: string[]) {
        this.channelKeys = channelKeys
        return this
    }

    withAllowedPreviousStatuses (allowedPreviousStatuses: string[]) {
        this.allowedPreviousStatuses = allowedPreviousStatuses
        return this
    }

    withRejectedPreviousStatuses (rejectedPreviousStatuses: string[]) {
        this.rejectedPreviousStatuses = rejectedPreviousStatuses
        return this
    }
}
