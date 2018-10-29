class EventReports{
  constructor(client){
    this.client = client;
  }

  byLabel(eventKey, label = null){
    return this.client.get(this.reportUrl('byLabel', eventKey, label)).then( (res) => res.data);
  }

  byStatus(eventKey, status = null){
    return this.client.get(this.reportUrl('byStatus', eventKey, status)).then( (res) => res.data);
  }

  byCategoryLabel(eventKey, categoryLabel = null){
    return this.client.get(this.reportUrl('byCategoryLabel', eventKey, categoryLabel)).then( (res) => res.data);
  }

  byCategoryKey(eventKey, categoryKey = null){
    return this.client.get(this.reportUrl('byCategoryKey', eventKey, categoryKey)).then( (res) => res.data);
  }

  byOrderId(eventKey, orderId = null){
    return this.client.get(this.reportUrl('byOrderId', eventKey, orderId)).then( (res) => res.data);
  }

  bySection(eventKey, section = null){
    return this.client.get(this.reportUrl('bySection', eventKey, section)).then( (res) => res.data);
  }

  reportUrl(reportType, eventKey, filter){
    if(filter === null || filter === undefined){
      return `/reports/events/${eventKey}/${reportType}`;
    }
    return `/reports/events/${eventKey}/${reportType}/${filter}`;
  }
}

module.exports = EventReports;
