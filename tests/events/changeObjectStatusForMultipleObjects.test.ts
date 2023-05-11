import { TestUtils } from '../TestUtils'
import { ObjectProperties } from '../../src/Events/ObjectProperties.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for multiple objects as an array of string', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.changeObjectStatus(event.key, ['A-1', 'A-2'], 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo1.status).toBe('lolzor')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo2.status).toBe('lolzor')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for multiple objects as an array of objects', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [new ObjectProperties('A-1'), new ObjectProperties('A-2')]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo1.status).toBe('lolzor')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo2.status).toBe('lolzor')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for multiple objects as an array of classes', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [{ objectId: 'A-1' }, { objectId: 'A-2' }]
    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfo2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo1.status).toBe('lolzor')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo2.status).toBe('lolzor')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for multiple objects as an array of classes with general admission', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [{ objectId: 'A-1' }, { objectId: 'GA1', quantity: 5 }]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfoGA1 = await client.events.retrieveObjectInfo(event.key, 'GA1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo1.status).toBe('lolzor')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfoGA1.numBooked).toBe(5)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for multiple objects as an array of classes and strings', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = ['A-1', { objectId: 'GA1', quantity: 5 }]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const objectInfo1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const objectInfoGA1 = await client.events.retrieveObjectInfo(event.key, 'GA1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfo1.status).toBe('lolzor')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfoGA1.numBooked).toBe(5)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for multiple objects with ticket types', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [
        (new ObjectProperties('A-1')).setTicketType('T1'),
        (new ObjectProperties('A-2')).setTicketType('T2')
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const status1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const status2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status1.status).toBe('lolzor')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status1.ticketType).toBe('T1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status2.status).toBe('lolzor')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status2.ticketType).toBe('T2')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for multiple objects with quantity', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [
        (new ObjectProperties('GA1')).setQuantity(5),
        (new ObjectProperties('34')).setQuantity(10)
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const status1 = await client.events.retrieveObjectInfo(event.key, 'GA1')
    const status2 = await client.events.retrieveObjectInfo(event.key, '34')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status1.numBooked).toBe(5)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status2.numBooked).toBe(10)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for multiple objects, GAs and Seats', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [
        (new ObjectProperties('GA1')).setQuantity(5),
        new ObjectProperties('A-1')
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const status1 = await client.events.retrieveObjectInfo(event.key, 'GA1')
    const status2 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status1.numBooked).toBe(5)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status2.status).toBe('lolzor')
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should change object status for multiple objects with extra data', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const objects = [
        (new ObjectProperties('A-1')).setExtraData({ foo: 'bar' }),
        (new ObjectProperties('A-2')).setExtraData({ foo: 'baz' })
    ]

    await client.events.changeObjectStatus(event.key, objects, 'lolzor')

    const status1 = await client.events.retrieveObjectInfo(event.key, 'A-1')
    const status2 = await client.events.retrieveObjectInfo(event.key, 'A-2')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status1.extraData).toEqual({ foo: 'bar' })
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(status2.extraData).toEqual({ foo: 'baz' })
})
