class Workspace {
    /**
     * @param {object} workspace
     */
    constructor (workspace) {
        this.id = workspace.id
        this.key = workspace.key
        this.secretKey = workspace.secretKey
        this.name = workspace.name
        this.settings = workspace.settings
        this.isDefault = workspace.isDefault
        this.isTest = workspace.isTest
        this.isActive = workspace.isActive
    }
}

module.exports = Workspace
