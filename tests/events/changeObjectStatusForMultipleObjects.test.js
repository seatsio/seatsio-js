const testUtils = require('../testUtils.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')

test('should change object status for multiple objects as an array of string', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.changeObjectStatus(event.key, ['A-1', 'A-2'], 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    expect(objectInfo1.status).toBe('lolzor')
    expect(objectInfo2.status).toBe('lolzor')
})

test('should change object status for multiple objects as an array of objects', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [new ObjectProperties('A-1'), new ObjectProperties('A-2')]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    expect(objectInfo1.status).toBe('lolzor')
    expect(objectInfo2.status).toBe('lolzor')
})

test('should change object status for multiple objects as an array of classes', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [{ objectId: 'A-1' }, { objectId: 'A-2' }]
    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    expect(objectInfo1.status).toBe('lolzor')
    expect(objectInfo2.status).toBe('lolzor')
})

test('should change object status for multiple objects as an array of classes with general admission', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [{ objectId: 'A-1' }, { objectId: 'GA1', quantity: 5 }]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfoGA1 = await client.events.retrieveObjectInfo(event.key, 'GA1')
    expect(objectInfo1.status).toBe('lolzor')
    expect(objectInfoGA1.numBooked).toBe(5)
})

test('should change object status for multiple objects as an array of classes and strings', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = ['A-1', { objectId: 'GA1', quantity: 5 }]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfoGA1 = await client.events.retrieveObjectInfo(event.key, 'GA1')
    expect(objectInfo1.status).toBe('lolzor')
    expect(objectInfoGA1.numBooked).toBe(5)
})

test('should change object status for multiple objects with ticket types', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [
        (new ObjectProperties('A-1')).setTicketType('T1'),
        (new ObjectProperties('A-2')).setTicketType('T2')
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const status1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const status2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    expect(status1.status).toBe('lolzor')
    expect(status1.ticketType).toBe('T1')
    expect(status2.status).toBe('lolzor')
    expect(status2.ticketType).toBe('T2')
})

test('should change object status for multiple objects with quantity', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [
        (new ObjectProperties('GA1')).setQuantity(5),
        (new ObjectProperties('34')).setQuantity(10)
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const status1 = await client.events.retrieveObjectInfo(event.key, 'GA1')
    const status2 = await client.events.retrieveObjectInfo(event.key, '34')
    expect(status1.numBooked).toBe(5)
    expect(status2.numBooked).toBe(10)
})

test('should change object status for multiple objects, GAs and Seats', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [
        (new ObjectProperties('GA1')).setQuantity(5),
        new ObjectProperties('A-1')
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const status1 = await client.events.retrieveObjectInfo(event.key, 'GA1')
    const status2 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    expect(status1.numBooked).toBe(5)
    expect(status2.status).toBe('lolzor')
})

test('should change object status for multiple objects with extra data', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [
        (new ObjectProperties('A-1')).setExtraData({ foo: 'bar' }),
        (new ObjectProperties('A-2')).setExtraData({ foo: 'baz' })
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const status1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const status2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    expect(status1.extraData).toEqual({ foo: 'bar' })
    expect(status2.extraData).toEqual({ foo: 'baz' })
})
