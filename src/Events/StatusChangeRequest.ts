export class StatusChangeRequest {
    allowedPreviousStatuses: any
    channelKeys: any
    eventKey: any
    holdToken: any
    ignoreChannels: any
    keepExtraData: any
    objectOrObjects: any
    orderId: any
    rejectedPreviousStatuses: any
    status: any

    constructor (eventKey: any, objectOrObjects: any, status: any, holdToken: any, orderId: any, keepExtraData: any, ignoreChannels: any, channelKeys: any, allowedPreviousStatuses: any, rejectedPreviousStatuses: any) {
        this.eventKey = eventKey
        this.objectOrObjects = objectOrObjects
        this.status = status
        this.holdToken = holdToken
        this.orderId = orderId
        this.keepExtraData = keepExtraData
        this.ignoreChannels = ignoreChannels
        this.channelKeys = channelKeys
        this.allowedPreviousStatuses = allowedPreviousStatuses
        this.rejectedPreviousStatuses = rejectedPreviousStatuses
    }
}
