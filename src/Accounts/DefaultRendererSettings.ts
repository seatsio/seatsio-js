import { Dict } from '../Dict'

type DefaultRendererSettingsJson = Dict<any>

export class DefaultRendererSettings {
    multiSelectEnabled: boolean
    showFullScreenButton: boolean

    constructor (json: DefaultRendererSettingsJson) {
        this.showFullScreenButton = json.showFullScreenButton
        this.multiSelectEnabled = json.multiSelectEnabled
    }
}
