class User {
    constructor (userJson) {
        this.id = userJson.id
        this.email = userJson.email
        this.name = userJson.name
        this.secretKey = userJson.secretKey
        this.designerKey = userJson.designerKey
        this.role = userJson.role
        this.createdOn = userJson.createdOn ? new Date(userJson.createdOn) : null
        this.isActive = userJson.isActive
        this.status = userJson.status
        this.workspaces = userJson.workspaces
    }
}

module.exports = User
