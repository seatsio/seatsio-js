class ChartLister{
  constructor(pageFetcher){
    this.pageFetcher = pageFetcher;
  }

  all(){
    return this.pageFetcher.fetch(null, null);
  }

}

module.exports = ChartLister;
