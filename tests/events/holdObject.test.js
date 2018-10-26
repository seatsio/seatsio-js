const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');

test('should hold objects', async ()=> {
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chartKey = await testUtils.createTestChartFromFile('/sampleChart.json', user.designerKey);
  var event = await client.events.create(chartKey);
  var holdToken = await client.holdTokens.create();
  var holdResult = await client.events.hold(event.key, ["A-1", "A-2"], holdToken.holdToken).catch( (err)=> console.log(err));

  var status1 = await client.events.retrieveObjectStatus(event.key, 'A-1');
  expect(status1.status).toBe(ObjectStatus.HELD);
  expect(status1.holdToken).toBe(holdToken.holdToken);

  var status2 = await client.events.retrieveObjectStatus(event.key, 'A-2');
  expect(status2.status).toBe(ObjectStatus.HELD);
  expect(status2.holdToken).toBe(holdToken.holdToken);

  //test this with LabelsBuilder once ready
  expect(holdResult.labels).toEqual({
              "A-1" : {'own' : {'label' : '1', 'type' : 'seat'}, 'parent' : { 'label' : "A",  'type' : "row"}},
              "A-2" : {'own' : {'label' : '2', 'type' : 'seat'}, 'parent' : { 'label' : "A",  'type' : "row"}}
            });
});
