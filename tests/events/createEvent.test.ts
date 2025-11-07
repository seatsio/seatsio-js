import { TestUtils } from '../testUtils'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { Category } from '../../src/Charts/Category'
import { LocalDate } from '../../src/LocalDate'
import { CreateEventParams } from '../../src/Events/CreateEventParams'
import { Channel } from '../../src/Events/Channel'
import { ForSaleConfig } from '../../src/Events/ForSaleConfig'

test('should check that only chart key is required', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey)

    expect(event.key).toBeTruthy()
    expect(event.id).toBeTruthy()
    expect(event.chartKey).toBe(chartKey)
    expect(event.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(event.supportsBestAvailable).toBe(true)
    expect(event.createdOn).toBeInstanceOf(Date)
    expect(event.forSaleConfig).toBeNull()
    expect(event.updatedOn).toBeNull()
    expect(event.name).toBeNull()
    expect(event.date).toBeNull()
    expect(event.categories).toEqual(TestUtils.testChartCategories)
})

test('should pass in event key as a create() param', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const event = await client.events.create(chart.key, new CreateEventParams().withKey('eventKey'))

    expect(event.key).toBe('eventKey')
})

test('supports tableBookingConfig custom', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingConfig = TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const event = await client.events.create(chartKey, new CreateEventParams().withTableBookingConfig(tableBookingConfig))

    expect(event.key).toBeTruthy()
    expect(event.tableBookingConfig).toEqual(tableBookingConfig)
})

test('supports tableBookingConfig inherit', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, new CreateEventParams().withTableBookingConfig(TableBookingConfig.inherit()))

    expect(event.key).toBeTruthy()
    expect(event.tableBookingConfig).toEqual(TableBookingConfig.inherit())
})

test('it supports object categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, new CreateEventParams().withObjectCategories({ 'A-1': 10 }))

    expect(event.objectCategories).toEqual({ 'A-1': 10 })
})

test('it supports categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB', false)

    const event = await client.events.create(chartKey, new CreateEventParams().withCategories([eventCategory]))

    expect(event.categories!.length).toEqual(4) // 3 from sampleChart.json, 1 event level category
    expect(event.categories!.filter((cat: Category) => cat.key === 'eventCat1').length).toEqual(1)
    expect(event.categories!.filter((cat: Category) => cat.key === 'eventCat1')[0].label).toEqual('Event Level Category')
    expect(event.categories!.filter((cat: Category) => cat.key === 'eventCat1')[0].color).toEqual('#AAABBB')
})

test('it supports a name', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const event = await client.events.create(chart.key, new CreateEventParams().withName('My event'))

    expect(event.name).toBe('My event')
})

test('it supports a date', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const event = await client.events.create(chart.key, new CreateEventParams().withDate(new LocalDate(2020, 1, 5)))

    expect(event.date).toEqual(new LocalDate(2020, 1, 5))
})

test('it supports channels', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const channels = [
        new Channel({ key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1', 'A-2'] }),
        new Channel({ key: 'channelKey2', name: 'channel 2', color: 'red', index: 2, objects: ['A-3'] })
    ]

    const event = await client.events.create(chartKey, new CreateEventParams().withChannels(channels))

    expect(event.channels).toEqual(channels)
})

test('it supports for sale config', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const forSaleConfig = new ForSaleConfig(false, ['A-1'], { GA1: 5 }, ['Cat1'])

    const event = await client.events.create(chartKey, new CreateEventParams().withForSaleConfig(forSaleConfig))

    expect(event.forSaleConfig).toEqual(forSaleConfig)
})
