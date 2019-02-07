const testUtils = require('../testUtils.js');
const StatusChangeParam = require('../../src/Events/StatusChangesParams.js');

test('should list status changes after given id ', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id);

    let labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel
    ];
    expect(labels).toEqual(['A-2', 'A-1']);
    expect(pageAfter.items.length).toBe(2);
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
    expect(firstPage.nextPageStartsAfter).toBe(null);
});

test('should list status changes after given id with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id, null,1);

    expect(pageAfter.items[0].objectLabel).toEqual('A-2');
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '');
    expect(pageAfter.items.length).toBe(1);
});

test('should list status changes after given id sorted by label', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);

    let params = new StatusChangeParam().sortByObjectLabel();
    let pageAfter =  await client.events.listStatusChangesPageAfter(event.key, firstPage.items[2].id, params);

    let labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel
    ];
    expect(labels).toEqual(['A-2', 'A-3']);
    expect(pageAfter.items.length).toBe(2);
    expect(pageAfter.nextPageStartsAfter).toBe(null);
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
});

test('should list status changes after given id sorted by label with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);

    let params = new StatusChangeParam().sortByObjectLabel();
    let pageAfter =  await client.events.listStatusChangesPageAfter(event.key, firstPage.items[2].id, params, 1);

    let labels = [
        pageAfter.items[0].objectLabel
    ];
    expect(labels).toEqual(['A-2']);
    expect(pageAfter.items.length).toBe(1);
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '');
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
});

test('should list status changes after given id sorted by status', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.hold(event.key, 'B-1', holdToken.holdToken);
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.release(event.key, 'B-1', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);

    let params = new StatusChangeParam().sortByStatus();
    let pageAfter =  await client.events.listStatusChangesPageAfter(event.key, firstPage.items[1].id, params);

    let labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel,
        pageAfter.items[2].objectLabel
    ];
    expect(labels).toEqual(['A-2', 'B-1', 'A-2']);
    expect(pageAfter.items.length).toBe(3);
    expect(pageAfter.nextPageStartsAfter).toBe(null);
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
});

test('should list status changes after given id sorted by status with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.hold(event.key, 'B-1', holdToken.holdToken);
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.release(event.key, 'B-1', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);

    let params = new StatusChangeParam().sortByStatus();
    let pageAfter =  await client.events.listStatusChangesPageAfter(event.key, firstPage.items[1].id, params, 2);

    let labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel
    ];
    expect(labels).toEqual(['A-2', 'B-1']);
    expect(pageAfter.items.length).toBe(2);
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[1].id + '');
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');

});

test('should list status changes after given id sorted by date ascending', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    await client.events.book(event.key, 'A-4');
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);

    let params = new StatusChangeParam().sortAscending();
    let pageAfter =  await client.events.listStatusChangesPageAfter(event.key, firstPage.items[2].id, params);

    let labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel
    ];
    expect(labels).toEqual(['A-3', 'A-4']);
    expect(pageAfter.items.length).toBe(2);
    expect(pageAfter.nextPageStartsAfter).toBe(null);
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
});

test('should list status changes after given id sorted by date ascending with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    await client.events.book(event.key, 'A-4');
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);

    let params = new StatusChangeParam().sortAscending();
    let pageAfter =  await client.events.listStatusChangesPageAfter(event.key, firstPage.items[2].id, params, 1);

    let labels = [
        pageAfter.items[0].objectLabel
    ];
    expect(labels).toEqual(['A-3']);
    expect(pageAfter.items.length).toBe(1);
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '');
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
});

test('should list status changes after given id with filter', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.hold(event.key, 'B-1', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);

    let params = new StatusChangeParam().withFilter('1');
    let pageAfter =  await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id, params);

    let labels = [
        pageAfter.items[0].objectLabel,
        pageAfter.items[1].objectLabel
    ];
    expect(labels).toEqual(['B-1', 'A-1']);
    expect(pageAfter.items.length).toBe(2);
    expect(pageAfter.nextPageStartsAfter).toBe(null);
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
});

test('should list status changes after given id with filter and page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.hold(event.key, 'B-1', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);

    let params = new StatusChangeParam().withFilter('1');
    let pageAfter =  await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id, params, 1);

    expect(pageAfter.items[0].objectLabel).toEqual('B-1');
    expect(pageAfter.items.length).toBe(1);
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '');
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
});


test('should not list status changes after given id with unmatched filter', async () => {
  let chartKey = testUtils.getChartKey();
  await testUtils.createTestChart(chartKey, user.designerKey);
  let event = await client.events.create(chartKey);
  await client.events.book(event.key, 'A-2');
  await client.events.book(event.key, 'B-2');
  await client.events.book(event.key, 'C-2');
  let firstPage =  await client.events.listStatusChangesFirstPage(event.key);

  let params = new StatusChangeParam().withFilter('1');
  let pageAfter = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id, params);

  expect(pageAfter.items).toEqual([]);
});
