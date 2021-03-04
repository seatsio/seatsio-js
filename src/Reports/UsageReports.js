class UsageReports {
    constructor (client) {
        this.client = client
    }

    summaryForAllMonths () {
        return this.client.get('/reports/usage')
            .then((res) => res.data)
    }

    detailsForMonth (month) {
        return this.client.get(`/reports/usage/month/${month}`)
            .then((res) => res.data)
    }

    detailsForEventInMonth (eventKey, month) {
        return this.client.get(`/reports/usage/month/${month}/event/${encodeURIComponent(eventKey)}`)
            .then((res) => res.data)
    }

    detailsForObjectInEventInMonth (objectLabel, eventKey, month) {
        return this.client.get(`/reports/usage/month/${month}/event/${encodeURIComponent(eventKey)}/object/${encodeURIComponent(objectLabel)}`)
            .then((res) => res.data)
    }

    subscription () {
        return this.client.get('/reports/subscription')
            .then((res) => res.data)
    }
}

module.exports = UsageReports
