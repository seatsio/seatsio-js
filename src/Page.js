class Page{
  constructor(){
    this.nextPageStartsAfter = '';
    this.previousPageEndsBefore = '';
  }

  setNextPageStartsAfter(nextPageStartsAfter){
    this.nextPageStartsAfter = nextPageStartsAfter;
  }

  setPreviousPageEndsBefore(previousPageEndsBefore){
        this.previousPageEndsBefore = previousPageEndsBefore;
    }
}

module.exports = Page;
