export class DefaultRendererSettings {
    multiSelectEnabled: any
    showFullScreenButton: any

    constructor (defaultRendererSettings: any) {
        this.showFullScreenButton = defaultRendererSettings.showFullScreenButton
        this.multiSelectEnabled = defaultRendererSettings.multiSelectEnabled
    }
}
