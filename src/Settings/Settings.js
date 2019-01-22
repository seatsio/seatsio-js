class Settings {
    /**
     * @param {SeatsioClient} client
     */
    constructor(client) {
        this.client = client;
    }

    regenerateSecretKey() {
        return this.client.post('/accounts/me/secret-key/actions/regenerate');
    }

    regenerateDesignerKey() {
        return this.client.post('/accounts/me/designer-key/actions/regenerate');
    }

    changePassword(password) {
        return this.client.post('/accounts/me/actions/change-password', { password })
    }

    changeDraftsValue(value) {
        if (value === 'TRUE') {
            return this.client.post('/accounts/me/draft-chart-drawings/actions/enable')
        } else if (value === 'FALSE') {
            return this.client.post('/accounts/me/draft-chart-drawings/actions/disable')
        }
    }

    changeHoldPeriod(period) {
        return this.client.post('/accounts/me/actions/change-hold-period', { holdPeriodInMinutes: period })
    }

    set(key, value) {
        return this.client.post('/accounts/me/settings', { key, value })
    }

    get() {
        return this.client.get('/accounts/me')
    }
}

module.exports = Settings;