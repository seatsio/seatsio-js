const SeatsioClientTest = require('../seatsioClientTest.js');

class RetrieveChartTest extends SeatsioClientTest{
  testRetrieve(){
    var chart = this.client.charts.create();
    //var retrievedChart = this.client.charts.retrieve(chart.key);
  }
}

var test = new RetrieveChartTest();

test.createTestUser();
test.createSeatsioClient();
setTimeout( () => console.log(test), 2000);
setTimeout( () => console.log("Chart key: " + test.createTestChart()), 3000);
setTimeout( () => console.log("Section Chart key: " + test.createTestChartWithSections()), 3000);
setTimeout( () => console.log("Table Chart key: " + test.createTestChartWithTables()), 3000);
setTimeout( () => test.testRetrieve(), 3000);
