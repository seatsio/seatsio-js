export class DefaultRendererSettings {
    multiSelectEnabled: any;
    showFullScreenButton: any;
    /**
     * @param {object} defaultRendererSettings
     */
    constructor (defaultRendererSettings: any) {
        this.showFullScreenButton = defaultRendererSettings.showFullScreenButton
        this.multiSelectEnabled = defaultRendererSettings.multiSelectEnabled
    }
}
