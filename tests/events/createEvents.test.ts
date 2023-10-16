import { TestUtils } from '../testUtils'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { Category } from '../../src/Charts/Category'
import { LocalDate } from '../../src/LocalDate'
import { CreateEventParams } from '../../src/Events/CreateEventParams'
import { Channel } from '../../src/Events/Channel'
import { ForSaleConfig } from '../../src/Events/ForSaleConfig'

test('should check that a minimum of one event is required', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    try {
        await client.events.createMultiple(chartKey)
    } catch (e: any) {
        expect(e.errors.length).toEqual(1)
        expect(e.errors[0].code).toBe('GENERAL_ERROR')
        expect(e.errors[0].message).toBe('#/events: expected minimum item count: 1, found: 0')
    }
})

test('should check that an empty object is a valid event definition', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const events = await client.events.createMultiple(chartKey, [new CreateEventParams()])

    expect(events).toHaveLength(1)
    expect(events[0].key).toBeTruthy()
})

test('should create a single event', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const events = await client.events.createMultiple(chart.key, [
        new CreateEventParams().withKey('eventKey')
    ])

    expect(events).toHaveLength(1)
    expect(events[0].key).toEqual('eventKey')

    const retrievedEvent = await client.events.retrieve('eventKey')
    expect(retrievedEvent.key).toEqual('eventKey')
})

test('should create multiple events', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const events = [
        new CreateEventParams().withKey('eventKey1'),
        new CreateEventParams().withKey('eventKey2')
    ]
    const createdEvents = await client.events.createMultiple(chart.key, events)

    expect(createdEvents).toHaveLength(2)
    expect(createdEvents[0].key).toEqual('eventKey1')
    expect(createdEvents[1].key).toEqual('eventKey2')
})

test('supports tableBookingConfig custom', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingConfig = TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const events = await client.events.createMultiple(chartKey, [
        new CreateEventParams().withTableBookingConfig(tableBookingConfig)
    ])

    expect(events[0].key).toBeTruthy()
    expect(events[0].tableBookingConfig).toEqual(tableBookingConfig)
})

test('supports tableBookingConfig inherit', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)

    const events = await client.events.createMultiple(chartKey, [
        new CreateEventParams().withTableBookingConfig(TableBookingConfig.inherit())
    ])

    expect(events[0].key).toBeTruthy()
    expect(events[0].tableBookingConfig).toEqual(TableBookingConfig.inherit())
})

test('it supports object categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const events = await client.events.createMultiple(chartKey, [
        new CreateEventParams().withObjectCategories({ 'A-1': 10 })
    ])

    expect(events[0].objectCategories).toEqual({ 'A-1': 10 })
})

test('it supports categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB', false)

    const events = await client.events.createMultiple(chartKey, [
        new CreateEventParams().withCategories([eventCategory])
    ])

    expect(events[0].categories!.length).toEqual(4) // 3 from sampleChart.json, 1 event level category
    expect(events[0].categories!.filter((cat: Category) => cat.key === 'eventCat1').length).toEqual(1)
    expect(events[0].categories!.filter((cat: Category) => cat.key === 'eventCat1')[0].label).toEqual('Event Level Category')
    expect(events[0].categories!.filter((cat: Category) => cat.key === 'eventCat1')[0].color).toEqual('#AAABBB')
})

test('it supports name', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const events = await client.events.createMultiple(chartKey, [
        new CreateEventParams().withName('My event')
    ])

    expect(events[0].name).toBe('My event')
})

test('it supports date', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const events = await client.events.createMultiple(chartKey, [
        new CreateEventParams().withDate(new LocalDate(2020, 1, 8))
    ])

    expect(events[0].date).toEqual(new LocalDate(2020, 1, 8))
})

test('it supports channels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const channels = [
        new Channel({ key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1', 'A-2'] }),
        new Channel({ key: 'channelKey2', name: 'channel 2', color: 'red', index: 2, objects: ['A-3'] })
    ]

    const events = await client.events.createMultiple(chartKey, [
        new CreateEventParams().withChannels(channels)
    ])

    expect(events[0].channels).toEqual(channels)
})

test('it supports for-sale config', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const forSaleConfig1 = new ForSaleConfig(false, ['A-1'], { GA1: 5 }, ['Cat1'])
    const forSaleConfig2 = new ForSaleConfig(false, ['A-2'], { GA1: 7 }, ['Cat1'])

    const events = await client.events.createMultiple(chartKey, [
        new CreateEventParams().withForSaleConfig(forSaleConfig1),
        new CreateEventParams().withForSaleConfig(forSaleConfig2)
    ])

    expect(events[0].forSaleConfig).toEqual(forSaleConfig1)
    expect(events[1].forSaleConfig).toEqual(forSaleConfig2)
})
