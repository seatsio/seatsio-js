import { ObjectOrObjects } from './Events'

export class StatusChangeRequest {
    eventKey: string
    objectOrObjects: ObjectOrObjects
    statusChangeCommandType: string
    status: string | null
    holdToken: string | null
    orderId: string | null
    keepExtraData: boolean | null
    ignoreChannels: boolean | null
    channelKeys: string[] | null
    allowedPreviousStatuses: string[] | null
    rejectedPreviousStatuses: string[] | null

    constructor (eventKey: string, objectOrObjects: ObjectOrObjects, status: string, holdToken: string | null, orderId: string | null, keepExtraData: boolean | null, ignoreChannels: boolean | null, channelKeys: string[] | null, allowedPreviousStatuses: string[] | null, rejectedPreviousStatuses: string[] | null) {
        this.eventKey = eventKey
        this.objectOrObjects = objectOrObjects
        this.statusChangeCommandType = 'CHANGE_STATUS_TO'
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
