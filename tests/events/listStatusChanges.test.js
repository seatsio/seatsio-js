const testUtils = require('../testUtils.js');
const ObjectProperties = require('../../src/Events/ObjectProperties.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');
const StatusChangeParam = require('../../src/Events/StatusChangesParams.js');

test('should list status changes', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let labels = [];

    for await (let statusChange of client.events.statusChanges(event.key)) {
        labels.push(statusChange.objectLabel);
    }

    expect(labels.sort()).toEqual(['A-1', 'A-2', 'A-3']);
});

test('properties of status change', async () => {
    let chartKey = testUtils.getChartKey();
    let objectStatus = new ObjectStatus();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let obj = new ObjectProperties('A-1').setExtraData({'foo': 'bar'});
    await client.events.book(event.key, obj, null, 'order1');

    let statusChanges = client.events.statusChanges(event.key);
    let statusChangesIterator = statusChanges[Symbol.asyncIterator]();
    let statusChange = await statusChangesIterator.next();

    expect(statusChange.value.id).toBeTruthy();
    expect(statusChange.value.date).toBeTruthy();
    expect(statusChange.value.orderId).toBe('order1');
    expect(statusChange.value.objectLabel).toBe('A-1');
    expect(statusChange.value.status).toBe(objectStatus.BOOKED);
    expect(statusChange.value.eventId).toBe(event.id);
    expect(statusChange.value.extraData).toEqual({'foo': 'bar'});
});

test('that status change contains holdToken', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken = await client.holdTokens.create();
    await client.events.hold(event.key, 'A-1', holdToken.holdToken);

    let statusChanges = client.events.statusChanges(event.key);
    let statusChangesIterator = statusChanges[Symbol.asyncIterator]();
    let statusChange = await statusChangesIterator.next();

    expect(statusChange.value.holdToken).toEqual(holdToken.holdToken);
});

test('that holdToken is null if booking without holdToken', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-2');

    let statusChanges = client.events.statusChanges(event.key);
    let statusChangesIterator = statusChanges[Symbol.asyncIterator]();
    let statusChange = await statusChangesIterator.next();

    expect(statusChange.value.holdToken).toEqual(null);
});

test('should list firstPage of status changes', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let statusChangeFirstPage =  await client.events.listStatusChangesFirstPage(event.key);

    expect(statusChangeFirstPage.items[0].objectLabel).toBe('A-3');
    expect(statusChangeFirstPage.items[1].objectLabel).toBe('A-2');
    expect(statusChangeFirstPage.items[2].objectLabel).toBe('A-1');
    expect(statusChangeFirstPage.items.length).toBe(3);
    expect(statusChangeFirstPage.nextPageStartsAfter).toBe(null);
});

test('should list firstPage of status changes sorted by label', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByObjectLabel();

    let statusChangeFirstPageSorted =  await client.events.listStatusChangesFirstPage(event.key, params);
    let labels = [statusChangeFirstPageSorted.items[0].objectLabel, statusChangeFirstPageSorted.items[1].objectLabel, statusChangeFirstPageSorted.items[2].objectLabel];

    expect(labels).toEqual(['A-1', 'A-2', 'A-3']);
    expect(statusChangeFirstPageSorted.items.length).toBe(3);
    expect(statusChangeFirstPageSorted.nextPageStartsAfter).toBe(null);
});

test('should list firstPage of status changes sorted by status', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByStatus();

    let statusChangeFirstPageSorted =  await client.events.listStatusChangesFirstPage(event.key, params);
    let labels = [
        statusChangeFirstPageSorted.items[0].objectLabel,
        statusChangeFirstPageSorted.items[1].objectLabel,
        statusChangeFirstPageSorted.items[2].objectLabel,
        statusChangeFirstPageSorted.items[3].objectLabel
    ];

    expect(labels).toEqual(['A-3', 'A-1', 'A-2', 'A-2']);
    expect(statusChangeFirstPageSorted.items[0].status).toBe('booked');
    expect(statusChangeFirstPageSorted.items[1].status).toBe('booked');
    expect(statusChangeFirstPageSorted.items[2].status).toBe('free');
    expect(statusChangeFirstPageSorted.items[3].status).toBe('reservedByToken');
});

test('should list firstPage of status changes sorted by date ascending', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByDateAsc();

    let statusChangeFirstPageSorted =  await client.events.listStatusChangesFirstPage(event.key, params);
    let labels = [
        statusChangeFirstPageSorted.items[0].objectLabel,
        statusChangeFirstPageSorted.items[1].objectLabel,
        statusChangeFirstPageSorted.items[2].objectLabel,
        statusChangeFirstPageSorted.items[3].objectLabel
    ];

    expect(labels).toEqual(['A-1', 'A-2', 'A-2', 'A-3']);
});

test('should list firstPage of status changes with filter', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    await client.events.book(event.key, 'B-2');
    let params = new StatusChangeParam().withFilter('2');

    let statusChangeFirstPageSorted =  await client.events.listStatusChangesFirstPage(event.key, params);
    let labels = [
        statusChangeFirstPageSorted.items[0].objectLabel,
        statusChangeFirstPageSorted.items[1].objectLabel,
        statusChangeFirstPageSorted.items[2].objectLabel
    ];

    expect(labels).toEqual(['B-2', 'A-2', 'A-2']);
    expect(statusChangeFirstPageSorted.items.length).toBe(3);
});

test('should list first page with given page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');

    let statusChangeFirstPage =  await client.events.listStatusChangesFirstPage(event.key, null,1);

    expect(statusChangeFirstPage.items[0].objectLabel).toBe('A-2');
    expect(statusChangeFirstPage.items.length).toBe(1);
    expect(statusChangeFirstPage.nextPageStartsAfter).toBe(statusChangeFirstPage.items[0].id + '');
});

test('should list page after given id', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let statusChangeFirstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageAfter = await client.events.listStatusChangesPageAfter(event.key, statusChangeFirstPage.items[0].id);

    expect([pageAfter.items[0].objectLabel, pageAfter.items[1].objectLabel]).toEqual(['A-2', 'A-1']);
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
    expect(pageAfter.items.length).toBe(2);
});

test('should list page after given id with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let statusChangeFirstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageAfter = await client.events.listStatusChangesPageAfter(event.key, statusChangeFirstPage.items[0].id, 1);

    expect(pageAfter.items[0].objectLabel).toEqual('A-2');
    expect(pageAfter.previousPageEndsBefore).toBe(pageAfter.items[0].id + '');
    expect(pageAfter.nextPageStartsAfter).toBe(pageAfter.items[0].id + '');
    expect(pageAfter.items.length).toBe(1);
});

test('should list before after given id', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let statusChangeFirstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, statusChangeFirstPage.items[2].id);
    
    expect([pageBefore.items[0].objectLabel, pageBefore.items[1].objectLabel]).toEqual(['A-3', 'A-2']);
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '');
    expect(pageBefore.items.length).toBe(2);
});

test('should list page before given id with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let statusChangeFirstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, statusChangeFirstPage.items[2].id, 1);

    expect(pageBefore.items[0].objectLabel).toEqual('A-2');
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '');
    expect(pageBefore.items.length).toBe(1);
});