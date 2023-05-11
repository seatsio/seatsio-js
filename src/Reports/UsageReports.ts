export class UsageReports {
    client: any;
    constructor (client: any) {
        this.client = client
    }

    summaryForAllMonths () {
        return this.client.get('/reports/usage')
            .then((res: any) => res.data);
    }

    detailsForMonth (month: any) {
        return this.client.get(`/reports/usage/month/${month}`)
            .then((res: any) => res.data);
    }

    detailsForEventInMonth (eventKey: any, month: any) {
        return this.client.get(`/reports/usage/month/${month}/event/${encodeURIComponent(eventKey)}`)
            .then((res: any) => res.data);
    }

    detailsForObjectInEventInMonth (objectLabel: any, eventKey: any, month: any) {
        return this.client.get(`/reports/usage/month/${month}/event/${encodeURIComponent(eventKey)}/object/${encodeURIComponent(objectLabel)}`)
            .then((res: any) => res.data);
    }

    subscription () {
        return this.client.get('/reports/subscription')
            .then((res: any) => res.data);
    }
}
