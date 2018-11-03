const testUtils = require('../testUtils.js');

test('getAll with more than 20 events)', async ()=> {
  jest.setTimeout(20000);
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  var generatedEventKeys = [];
  for(var i = 0; i < 25; i++){
    var event = await client.events.create(chart.key);
    generatedEventKeys.push(event.key);
  }

  var eventPages = await client.events.getAll();
  var retrievedEventKeys = [];
  for await (let eventPage of eventPages){
    for(let event of eventPage){
      retrievedEventKeys.push(event.key);
    }
  }

  expect(retrievedEventKeys.sort()).toEqual(generatedEventKeys.sort());
  expect(retrievedEventKeys.length).toBe(25);
});

test('getAll with more than 40 events)', async ()=> {
  jest.setTimeout(20000);
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chart = await client.charts.create();
  var generatedEventKeys = [];
  for(var i = 0; i < 45; i++){
    var event = await client.events.create(chart.key);
    generatedEventKeys.push(event.key);
  }

  var eventPages = await client.events.getAll();
  var retrievedEventKeys = [];
  for await (let eventPage of eventPages){
    for(let event of eventPage){
      retrievedEventKeys.push(event.key);
    }
  }

  expect(retrievedEventKeys.sort()).toEqual(generatedEventKeys.sort());
  expect(retrievedEventKeys.length).toBe(45);
});
