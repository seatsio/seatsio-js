class DefaultRendererSettings {
    /**
     * @param {object} defaultRendererSettings
     */
    constructor (defaultRendererSettings) {
        this.showFullScreenButton = defaultRendererSettings.showFullScreenButton
        this.multiSelectEnabled = defaultRendererSettings.multiSelectEnabled
    }
}

module.exports = DefaultRendererSettings
