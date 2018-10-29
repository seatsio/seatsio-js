const testUtils = require('../testUtils.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');
const ObjectProperties = require('../../src/Events/ObjectProperties.js')

test('summaryByStatus', async () =>{
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chartKey = testUtils.getChartKey();
  await testUtils.createTestChart(chartKey, user.designerKey);
  var event = await client.events.create(chartKey);
  await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1');
  var report = await client.eventReports.summaryByStatus(event.key);

  expect(report[ObjectStatus.BOOKED]['count']).toBe(1);
  expect(report[ObjectStatus.BOOKED]['bySection']['NO_SECTION']).toBe(1);
  expect(report[ObjectStatus.BOOKED]['byCategoryKey']['9']).toBe(1);
  expect(report[ObjectStatus.BOOKED]['byCategoryLabel']['Cat1']).toBe(1);
  expect(report[ObjectStatus.FREE]['count']).toBe(33);
  expect(report[ObjectStatus.FREE]['bySection']['NO_SECTION']).toBe(33);
  expect(report[ObjectStatus.FREE]['byCategoryKey']['9']).toBe(16);
  expect(report[ObjectStatus.FREE]['byCategoryKey']['10']).toBe(17);
  expect(report[ObjectStatus.FREE]['byCategoryLabel']['Cat1']).toBe(16);
  expect(report[ObjectStatus.FREE]['byCategoryLabel']['Cat2']).toBe(17);
});

test('summaryByCategoryKey', async () =>{
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chartKey = testUtils.getChartKey();
  await testUtils.createTestChart(chartKey, user.designerKey);
  var event = await client.events.create(chartKey);
  await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1');
  var report = await client.eventReports.summaryByCategoryKey(event.key);

  expect(report['9']['count']).toBe(17);
  expect(report['9']['bySection']['NO_SECTION']).toBe(17);
  expect(report['9']['byStatus'][ObjectStatus.BOOKED]).toBe(1);
  expect(report['9']['byStatus'][ObjectStatus.FREE]).toBe(16);
  expect(report['10']['count']).toBe(17);
  expect(report['10']['bySection']['NO_SECTION']).toBe(17);
  expect(report['10']['byStatus'][ObjectStatus.FREE]).toBe(17);
});

test('summaryByCategoryLabel', async () =>{
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chartKey = testUtils.getChartKey();
  await testUtils.createTestChart(chartKey, user.designerKey);
  var event = await client.events.create(chartKey);
  await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1');
  var report = await client.eventReports.summaryByCategoryLabel(event.key);

  expect(report['Cat1']['count']).toBe(17);
  expect(report['Cat1']['bySection']['NO_SECTION']).toBe(17);
  expect(report['Cat1']['byStatus'][ObjectStatus.BOOKED]).toBe(1);
  expect(report['Cat1']['byStatus'][ObjectStatus.FREE]).toBe(16);
  expect(report['Cat2']['count']).toBe(17);
  expect(report['Cat2']['bySection']['NO_SECTION']).toBe(17);
  expect(report['Cat2']['byStatus'][ObjectStatus.FREE]).toBe(17);
});

test('summaryBySection', async () =>{
  var user = await testUtils.createTestUser();
  var client = testUtils.createClient(user.secretKey, testUtils.baseUrl);
  var chartKey = testUtils.getChartKey();
  await testUtils.createTestChart(chartKey, user.designerKey);
  var event = await client.events.create(chartKey);
  await client.events.book(event.key, (new ObjectProperties('A-1')).setTicketType('ticketType1'), null, 'order1');
  var report = await client.eventReports.summaryBySection(event.key);

  expect(report['NO_SECTION']['count']).toBe(34);
  expect(report['NO_SECTION']['byStatus'][ObjectStatus.BOOKED]).toBe(1);
  expect(report['NO_SECTION']['byStatus'][ObjectStatus.FREE]).toBe(33);
  expect(report['NO_SECTION']['byCategoryKey']['9']).toBe(17);
  expect(report['NO_SECTION']['byCategoryKey']['10']).toBe(17);
  expect(report['NO_SECTION']['byCategoryLabel']['Cat1']).toBe(17);
  expect(report['NO_SECTION']['byCategoryLabel']['Cat2']).toBe(17);
});
