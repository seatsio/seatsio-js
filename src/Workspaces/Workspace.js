class Workspace {
    /**
     * @param {object} workspace
     */
    constructor (workspace) {
        this.id = workspace.id
        this.key = workspace.key
        this.name = workspace.name
        this.primaryUser = workspace.primaryUser
        this.settings = workspace.settings
        this.isMain = workspace.isMain
        this.isTest = workspace.isTest
    }
}

module.exports = Workspace
