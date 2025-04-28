import { ObjectOrObjects } from './Events'

export class StatusChangeRequest {
    static TYPE_RELEASE = 'RELEASE'
    static TYPE_CHANGE_STATUS_TO = 'CHANGE_STATUS_TO'
    static TYPE_OVERRIDE_SEASON_STATUS = 'OVERRIDE_SEASON_STATUS'
    static TYPE_USE_SEASON_STATUS = 'USE_SEASON_STATUS'

    type = StatusChangeRequest.TYPE_CHANGE_STATUS_TO
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
    resaleListingId: string | null = null

    withType (type: string) {
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

    withResaleListingId (resaleListingId: string) {
        this.resaleListingId = resaleListingId
        return this
    }
}
