const testUtils = require('../testUtils.js');
const ObjectProperties = require('../../src/Events/ObjectProperties.js');
const ObjectStatus = require('../../src/Events/ObjectStatus.js');
const StatusChangeParam = require('../../src/Events/StatusChangesParams.js');

test('should list all status changes', async () => {
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

test('should list all status changes sorted by label', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByObjectLabel();
    let labels = [];

    for await (let statusChange of client.events.statusChanges(event.key, null, params)) {
        labels.push(statusChange.objectLabel);
    }

    expect(labels).toEqual(['A-1', 'A-2', 'A-3']);
});

test('should list all status changes sorted by status', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken = await client.holdTokens.create();
    await client.events.book(event.key, 'B-1');
    await client.events.hold(event.key, 'A-1', holdToken.holdToken);
    await client.events.release(event.key, 'A-1', holdToken.holdToken);
    await client.events.book(event.key, 'A-2');
    await client.events.hold(event.key, 'A-3', holdToken.holdToken);
    let params = new StatusChangeParam().sortByStatus();
    let labels = [];

    for await (let statusChange of client.events.statusChanges(event.key, null, params)) {
        labels.push(statusChange.objectLabel);
    }

    expect(labels).toEqual(['A-2', 'B-1', 'A-1', 'A-3', 'A-1']);
});

test('should list all status changes sorted by date ascending', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-3');
    await client.events.book(event.key, 'A-2');
    let params = new StatusChangeParam().sortByDateAsc();
    let labels = [];

    for await (let statusChange of client.events.statusChanges(event.key, null, params)) {
        labels.push(statusChange.objectLabel);
    }

    expect(labels).toEqual(['A-1', 'A-3', 'A-2']);
});

test('should list all status changes with filter', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'B-2');
    let params = new StatusChangeParam().withFilter('2');
    let labels = [];

    for await (let statusChange of client.events.statusChanges(event.key, null, params)) {
        labels.push(statusChange.objectLabel);
    }

    expect(labels).toEqual(['B-2', 'A-2']);
});

test('should not list status changes with unmatched filter', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'B-2');
    let params = new StatusChangeParam().withFilter('3');
    let labels = [];

    for await (let statusChange of client.events.statusChanges(event.key, null, params)) {
        labels.push(statusChange.objectLabel);
    }

    expect(labels).toEqual([]);
});

test('properties of status changes', async () => {
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

test('should list status changes with hold token', async () => {
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

test('should list status changes with null hold token if no hold token was used', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-2');

    let statusChanges = client.events.statusChanges(event.key);
    let statusChangesIterator = statusChanges[Symbol.asyncIterator]();
    let statusChange = await statusChangesIterator.next();

    expect(statusChange.value.holdToken).toEqual(null);
});

test('should list status changes in the first page', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ];

    expect(labels).toEqual(['A-3', 'A-2', 'A-1']);
    expect(firstPage.items.length).toBe(3);
    expect(firstPage.nextPageStartsAfter).toBe(null);
    expect(firstPage.previousPageEndsBefore).toBe(null);
});

test('should list status changes in the first page with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, null,1);

    expect(firstPage.items[0].objectLabel).toBe('A-2');
    expect(firstPage.items.length).toBe(1);
    expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[0].id + '');
    expect(firstPage.previousPageEndsBefore).toBe(null);
});

test('should list status changes in the first page sorted by label', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByObjectLabel();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params);
    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ];

    expect(labels).toEqual(['A-1', 'A-2', 'A-3']);
    expect(firstPage.items.length).toBe(3);
    expect(firstPage.nextPageStartsAfter).toBe(null);
    expect(firstPage.previousPageEndsBefore).toBe(null);
});

test('should list status changes in the first page sorted by label with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByObjectLabel();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params, 1);

    expect(firstPage.items[0].objectLabel).toEqual('A-1');
    expect(firstPage.items.length).toBe(1);
    expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[0].id + '');
    expect(firstPage.previousPageEndsBefore).toBe(null);
});

test('should list status changes in the first page sorted by status', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByStatus();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params);
    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel,
        firstPage.items[3].objectLabel
    ];

    expect(labels).toEqual(['A-3', 'A-1', 'A-2', 'A-2']);
    expect(firstPage.items[0].status).toBe('booked');
    expect(firstPage.items[1].status).toBe('booked');
    expect(firstPage.items[2].status).toBe('free');
    expect(firstPage.items[3].status).toBe('reservedByToken');
    expect(firstPage.items.length).toBe(4);
    expect(firstPage.nextPageStartsAfter).toBe(null);
    expect(firstPage.previousPageEndsBefore).toBe(null);
});

test('should list status changes in the first page sorted by status with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByStatus();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params, 2);
    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel
    ];

    expect(labels).toEqual(['A-3', 'A-1']);
    expect(firstPage.items[0].status).toBe('booked');
    expect(firstPage.items[1].status).toBe('booked');
    expect(firstPage.items.length).toBe(2);
    expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[1].id + '');
    expect(firstPage.previousPageEndsBefore).toBe(null);
});

test('should list status changes in the first page sorted by date ascending', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByDateAsc();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params);
    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel,
        firstPage.items[3].objectLabel
    ];

    expect(labels).toEqual(['A-1', 'A-2', 'A-2', 'A-3']);
    expect(firstPage.items.length).toBe(4);
    expect(firstPage.nextPageStartsAfter).toBe(null);
    expect(firstPage.previousPageEndsBefore).toBe(null);
});

test('should list status changes in the first page sorted by date ascending with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken  = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByDateAsc();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params, 2);
    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel
    ];

    expect(labels).toEqual(['A-1', 'A-2']);
    expect(firstPage.items.length).toBe(2);
    expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[1].id + '');
    expect(firstPage.previousPageEndsBefore).toBe(null);
});

test('should list status changes in the first page with filter', async () => {
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

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params);
    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ];

    expect(labels).toEqual(['B-2', 'A-2', 'A-2']);
    expect(firstPage.items.length).toBe(3);
    expect(firstPage.nextPageStartsAfter).toBe(null);
    expect(firstPage.previousPageEndsBefore).toBe(null);
});

test('should list status changes in the first page with filter and page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().withFilter('A');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params, 1);
    let labels = [
        firstPage.items[0].objectLabel
    ];

    expect(labels).toEqual(['A-3']);
    expect(firstPage.items.length).toBe(1);
    expect(firstPage.nextPageStartsAfter).toBe(firstPage.items[0].id + '');
    expect(firstPage.previousPageEndsBefore).toBe(null);
});

test('should not list status changes in the first page with unmatched filter', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    let params = new StatusChangeParam().withFilter('B');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params);

    expect(firstPage.items).toEqual([]);
});

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
    let params = new StatusChangeParam().sortByObjectLabel();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
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
    let params = new StatusChangeParam().sortByObjectLabel();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
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
    let params = new StatusChangeParam().sortByStatus();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
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
    let params = new StatusChangeParam().sortByStatus();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
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
    let params = new StatusChangeParam().sortByDateAsc();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
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
    let params = new StatusChangeParam().sortByDateAsc();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
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
    let params = new StatusChangeParam().withFilter('1');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
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
    let params = new StatusChangeParam().withFilter('1');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
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
    let params = new StatusChangeParam().withFilter('1');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageAfter(event.key, firstPage.items[0].id, params);

    expect(pageBefore.items).toEqual([]);
});

test('should list status changes before given id', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[2].id);
    
    expect([pageBefore.items[0].objectLabel, pageBefore.items[1].objectLabel]).toEqual(['A-3', 'A-2']);
    expect(pageBefore.items.length).toBe(2);
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(null);
});

test('should list status changes before given id with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[2].id, null, 1);

    expect(pageBefore.items[0].objectLabel).toEqual('A-2');
    expect(pageBefore.items.length).toBe(1);
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '');
});

test('should list status changes before given id sorted by label', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByObjectLabel();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[0].id, params);
    let labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel
    ];

    expect(labels).toEqual(['A-1', 'A-2']);
    expect(pageBefore.items.length).toBe(2);
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(null);
});

test('should list status changes before given id sorted by label with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    let params = new StatusChangeParam().sortByObjectLabel();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[0].id, params, 1);
    let labels = [
        pageBefore.items[0].objectLabel
    ];

    expect(labels).toEqual( ['A-2']);
    expect(pageBefore.items.length).toBe(1);
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '');
});

test('should list status changes before given id sorted by status', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken = await client.holdTokens.create();
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.book(event.key, 'A-1');
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.hold(event.key, 'A-3', holdToken.holdToken);
    let params = new StatusChangeParam().sortByStatus();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[3].id, params);
    let labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel,
        pageBefore.items[2].objectLabel
    ];

    expect(labels).toEqual(['A-1', 'A-2' , 'A-3']);
    expect(pageBefore.items.length).toBe(3);
    expect(pageBefore.nextPageStartsAfter).toEqual(pageBefore.items[2].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(null);
});

test('should list status changes before given id sorted by status with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken = await client.holdTokens.create();
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.book(event.key, 'A-1');
    await client.events.release(event.key, 'A-2', holdToken.holdToken);
    await client.events.hold(event.key, 'A-3', holdToken.holdToken);
    let params = new StatusChangeParam().sortByStatus();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[3].id, params, 2);
    let labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel
    ];

    expect(labels).toEqual(['A-2', 'A-3']);
    expect(pageBefore.items.length).toBe(2);
    expect(pageBefore.nextPageStartsAfter).toEqual(pageBefore.items[1].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '');
});

test('should list status changes before given id sorted by date ascending', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    await client.events.book(event.key, 'A-4');
    await client.events.book(event.key, 'A-5');
    let params = new StatusChangeParam().sortByDateAsc();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[1].id, params);
    let labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel,
        pageBefore.items[2].objectLabel
    ];

    expect(labels).toEqual(['A-1', 'A-2', 'A-3']);
    expect(pageBefore.items.length).toBe(3);
    expect(pageBefore.nextPageStartsAfter).toEqual(pageBefore.items[2].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(null);

});

test('should list status changes before given id sorted by date ascending with page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');
    await client.events.book(event.key, 'A-4');
    await client.events.book(event.key, 'A-5');
    let params = new StatusChangeParam().sortByDateAsc();

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[1].id, params, 2);
    let labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel
    ];

    expect(labels).toEqual(['A-2', 'A-3']);
    expect(pageBefore.items.length).toBe(2);
    expect(pageBefore.nextPageStartsAfter).toEqual(pageBefore.items[1].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '');
});

test('should list status changes before given id with filter', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'B-2');
    await client.events.book(event.key, 'C-2');
    let params = new StatusChangeParam().withFilter('-2');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[2].id, params);
    let labels = [
        pageBefore.items[0].objectLabel,
        pageBefore.items[1].objectLabel
    ];

    expect(labels).toEqual(['C-2', 'B-2']);
    expect(pageBefore.items.length).toBe(2);
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[1].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(null);
});

test('should list status changes before given id with filter and page size', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'B-2');
    await client.events.book(event.key, 'C-2');
    let params = new StatusChangeParam().withFilter('2');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[2].id, params, 1);
    let labels = [
        pageBefore.items[0].objectLabel
    ];

    expect(labels).toEqual(['B-2']);
    expect(pageBefore.items.length).toBe(1);
    expect(pageBefore.nextPageStartsAfter).toBe(pageBefore.items[0].id + '');
    expect(pageBefore.previousPageEndsBefore).toBe(pageBefore.items[0].id + '');
});

test('should not list status changes before given id with unmatched filter', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'B-2');
    await client.events.book(event.key, 'C-2');
    let params = new StatusChangeParam().withFilter('1');

    let firstPage =  await client.events.listStatusChangesFirstPage(event.key);
    let pageBefore = await client.events.listStatusChangesPageBefore(event.key, firstPage.items[2].id, params);

    expect(pageBefore.items).toEqual([]);
});

test('list status changes when based on latest parameter passed, sortByObjectLabel', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let params = new StatusChangeParam().withFilter('1').sortByObjectLabel();
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params);
    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ];

    expect(labels).toEqual(['A-1', 'A-2', 'A-3']);
    expect(firstPage.items.length).toEqual(3);
});

test('list status changes when based on latest parameter passed, sortByDateAsc', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-2');
    await client.events.book(event.key, 'A-3');

    let params = new StatusChangeParam().withFilter('1').sortByDateAsc();
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params);

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ];
    expect(labels).toEqual(['A-1', 'A-2', 'A-3']);
    expect(firstPage.items.length).toEqual(3);
});

test('list status changes when based on latest parameter passed, sortByStatus', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    let holdToken = await client.holdTokens.create();
    await client.events.book(event.key, 'A-1');
    await client.events.hold(event.key, 'A-2', holdToken.holdToken);
    await client.events.hold(event.key, 'B-1', holdToken.holdToken);
    await client.events.release(event.key, 'A-2', holdToken.holdToken);

    let params = new StatusChangeParam().withFilter('1').sortByStatus();
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params);

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel,
        firstPage.items[3].objectLabel
    ];
    expect(labels).toEqual(['A-1', 'A-2', 'B-1', 'A-2']);
    expect(firstPage.items.length).toEqual(4);

});

test('list status changes when based on latest parameter passed, filter', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'B-2');
    await client.events.book(event.key, 'C-2');

    let params = new StatusChangeParam().sortByDateAsc().withFilter('1');
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params);

    expect(firstPage.items[0].objectLabel).toBe('A-1');
    expect(firstPage.items.length).toBe(1);
});

test('list status changes when based on latest parameter passed, chained', async () => {
    let chartKey = testUtils.getChartKey();
    await testUtils.createTestChart(chartKey, user.designerKey);
    let event = await client.events.create(chartKey);
    await client.events.book(event.key, 'A-1');
    await client.events.book(event.key, 'A-3');
    await client.events.book(event.key, 'A-2');

    let params = new StatusChangeParam().sortByDateAsc().withFilter('1').sortByObjectLabel();
    let firstPage =  await client.events.listStatusChangesFirstPage(event.key, params);

    let labels = [
        firstPage.items[0].objectLabel,
        firstPage.items[1].objectLabel,
        firstPage.items[2].objectLabel
    ];
    expect(labels).toEqual(['A-1', 'A-2', 'A-3']);
    expect(firstPage.items.length).toBe(3);
});