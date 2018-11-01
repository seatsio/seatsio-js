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
    if(expandEvents === true){
      this.expand = 'events';
    }
    return this;
  }
}

module.exports = ChartListParams;
