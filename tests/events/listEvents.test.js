const testUtils = require('../testUtils.js');

test('should list all events, create a page', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();

  var event1 = await client.events.create(chart.key);
  var event2 = await client.events.create(chart.key);
  var event3 = await client.events.create(chart.key);

  var eventPage = await client.events.listAll();
  var eventKeys = [];
  for (let event of eventPage){
    eventKeys.push(event.key);
  }

  expect(eventKeys).toContain(event1.key);
  expect(eventKeys).toContain(event2.key);
  expect(eventKeys).toContain(event3.key);
});
