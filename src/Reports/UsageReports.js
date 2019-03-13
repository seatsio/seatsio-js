class UsageReports {
  constructor (client) {
    this.client = client
  }

  allMonths () {
    return this.client.get('/reports/usage')
      .then((res) => res.data)
  }

  month(month) {
    return this.client.get(`/reports/usage/month/${month}`)
        .then((res) => res.data)
  }

  eventInMonth(eventKey, month) {
    return this.client.get(`/reports/usage/month/${month}/event/${encodeURIComponent(eventKey)}`)
        .then((res) => res.data)
  }

  objectInEventInMonth(objectLabel, eventKey, month) {
    return this.client.get(`/reports/usage/month/${month}/event/${encodeURIComponent(eventKey)}/object/${encodeURIComponent(objectLabel)}`)
        .then((res) => res.data)
  }
}

module.exports = UsageReports
