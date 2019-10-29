const testUtils = require('../testUtils.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')

test('should change object status for multiple objects as an array of string', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    let event = await client.events.create(chartKey)

    await client.events.changeObjectStatus(event.key, ['A-1', 'A-2'], 'lolzor')

    let objStatus1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    let objStatus2 = await client.events.retrieveObjectStatus(event.key, 'A-2')
    expect(objStatus1.status).toBe('lolzor')
    expect(objStatus2.status).toBe('lolzor')
})

test('should change object status for multiple objects as an array of objects', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    let event = await client.events.create(chartKey)
    let objects = [new ObjectProperties('A-1'), new ObjectProperties('A-2')]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    let objStatus1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    let objStatus2 = await client.events.retrieveObjectStatus(event.key, 'A-2')
    expect(objStatus1.status).toBe('lolzor')
    expect(objStatus2.status).toBe('lolzor')
})

test('should change object status for multiple objects as an array of classes', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    let event = await client.events.create(chartKey)
    let objects = [{ 'objectId': 'A-1' }, { 'objectId': 'A-2' }]
    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    let objStatus1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    let objStatus2 = await client.events.retrieveObjectStatus(event.key, 'A-2')
    expect(objStatus1.status).toBe('lolzor')
    expect(objStatus2.status).toBe('lolzor')
})

test('should change object status for multiple objects as an array of classes with general admission', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    let event = await client.events.create(chartKey)
    let objects = [{ objectId: 'A-1' }, { objectId: 'GA1', quantity: 5 }]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    let objStatusA1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    let objStatusGA1 = await client.events.retrieveObjectStatus(event.key, 'GA1')
    expect(objStatusA1.status).toBe('lolzor')
    expect(objStatusGA1.quantity).toBe(5)
})

test('should change object status for multiple objects as an array of classes and strings', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    let event = await client.events.create(chartKey)
    let objects = ['A-1', { objectId: 'GA1', quantity: 5 }]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    let objStatusA1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    let objStatusGA1 = await client.events.retrieveObjectStatus(event.key, 'GA1')
    expect(objStatusA1.status).toBe('lolzor')
    expect(objStatusGA1.quantity).toBe(5)
})

test('should change object status for multiple objects with ticket types', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    let event = await client.events.create(chartKey)
    let objects = [
        (new ObjectProperties('A-1')).setTicketType('T1'),
        (new ObjectProperties('A-2')).setTicketType('T2')
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    let status1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    let status2 = await client.events.retrieveObjectStatus(event.key, 'A-2')
    expect(status1.status).toBe('lolzor')
    expect(status1.ticketType).toBe('T1')
    expect(status2.status).toBe('lolzor')
    expect(status2.ticketType).toBe('T2')
})

test('should change object status for multiple objects with quantity', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    let event = await client.events.create(chartKey)
    let objects = [
        (new ObjectProperties('GA1')).setQuantity(5),
        (new ObjectProperties('34')).setQuantity(10)
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    let status1 = await client.events.retrieveObjectStatus(event.key, 'GA1')
    let status2 = await client.events.retrieveObjectStatus(event.key, '34')
    expect(status1.quantity).toBe(5)
    expect(status2.quantity).toBe(10)
})

test('should change object status for multiple objects, GAs and Seats', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    let event = await client.events.create(chartKey)
    let objects = [
        (new ObjectProperties('GA1')).setQuantity(5),
        new ObjectProperties('A-1')
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    let status1 = await client.events.retrieveObjectStatus(event.key, 'GA1')
    let status2 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    expect(status1.quantity).toBe(5)
    expect(status2.status).toBe('lolzor')
})

test('should change object status for multiple objects with extra data', async () => {
    let chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    let event = await client.events.create(chartKey)
    let objects = [
        (new ObjectProperties('A-1')).setExtraData({ 'foo': 'bar' }),
        (new ObjectProperties('A-2')).setExtraData({ 'foo': 'baz' })
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    let status1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
    let status2 = await client.events.retrieveObjectStatus(event.key, 'A-2')
    expect(status1.extraData).toEqual({ 'foo': 'bar' })
    expect(status2.extraData).toEqual({ 'foo': 'baz' })
})
