const Page = require('../Page.js');
const Chart = require('./Chart.js');

class ChartPage extends Page{
  constructor(charts){
    super();
    this.items = charts; //will be an array of Charts
  }
}

module.exports = ChartPage;
