class ChartListParams{
  withFilter(filter){
    this.filter = filter;
    return this;
  }

  withTag(tag){
    this.tag = tag;
    return this;
  }

  withExpandEvents(expandEvents){
    this.expandEvents = expandEvents;
    return this;
  }
}

module.exports = ChartListParams;
