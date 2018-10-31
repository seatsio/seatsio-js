class Page{
  constructor(items){
    this.items = items;
    this.nextPageStartsAfter = '';
    this.previousPageEndsBefore = '';
  }

  setNextPageStartsAfter(nextPageStartsAfter){
    this.nextPageStartsAfter = nextPageStartsAfter;
  }

  setPreviousPageEndsBefore(previousPageEndsBefore){
        this.previousPageEndsBefore = previousPageEndsBefore;
  }

  [Symbol.iterator](){
    let index = 0;
    var charts = this.items;
    return {
      next(){
      if(index < charts.length){
        var chart = charts[index];
        index++;
        //console.log(chart);
        return {value: chart, done: false}
      }
      else {
        return {done: true}
      }
    }
  };
  }

}


module.exports = Page;
