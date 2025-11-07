import { TestUtils } from '../testUtils'
import { CreateSeasonParams } from '../../src/Seasons/CreateSeasonParams'
import { Event } from '../../src/Events/Event'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { Channel } from '../../src/Events/Channel'
import { ForSaleConfig } from '../../src/Events/ForSaleConfig'

test('chart key is required', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const season = await client.seasons.create(chartKey)

    expect(season.partialSeasonKeys.length).toBe(0)
    expect(season.events!.length).toBe(0)
    expect(season.id).toBeTruthy()
    expect(season.key).toBe(season.key)
    expect(season.chartKey).toBe(chartKey)
    expect(season.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(season.supportsBestAvailable).toBe(true)
    expect(season.createdOn).toBeInstanceOf(Date)
    expect(season.forSaleConfig).toBeNull()
    expect(season.updatedOn).toBeNull()
})

test('key can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new CreateSeasonParams().key('aSeason'))

    expect(season.key).toBe('aSeason')
})

test('name can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new CreateSeasonParams().name('aSeason'))

    expect(season.name).toBe('aSeason')
})

test('number of events can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new CreateSeasonParams().numberOfEvents(2))

    expect(season.events!.length).toBe(2)
})

test('event keys can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new CreateSeasonParams().eventKeys(['event1', 'event2']))

    expect(season.events!.map((event: Event) => event.key)).toEqual(['event1', 'event2'])
})

test('table booking config can be passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingConfig = TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const season = await client.seasons.create(chartKey, new CreateSeasonParams().tableBookingConfig(tableBookingConfig))

    expect(season.tableBookingConfig).toEqual(tableBookingConfig)
})

test('channels can be passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const channels = [
        new Channel({ key: 'channelKey1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1', 'A-2'] }),
        new Channel({ key: 'channelKey2', name: 'channel 2', color: 'red', index: 2, objects: ['A-3'] })
    ]

    const season = await client.seasons.create(chartKey, new CreateSeasonParams().channels(channels))

    expect(season.channels).toEqual(channels)
})

test('for sale config can be passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const forSaleConfig = new ForSaleConfig(false, ['A-1'], { GA1: 5 }, ['Cat1'])

    const season = await client.seasons.create(chartKey, new CreateSeasonParams().forSaleConfig(forSaleConfig))

    expect(season.forSaleConfig).toEqual(forSaleConfig)
})

test('for sale config can be passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const forSaleConfig = new ForSaleConfig(false, ['A-1'], { GA1: 5 }, ['Cat1'])

    const season = await client.seasons.create(chartKey, new CreateSeasonParams().forSaleConfig(forSaleConfig))

    expect(season.forSaleConfig).toEqual(forSaleConfig)
})

test('for sale propagated flag can be passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const forSaleConfig = new ForSaleConfig(false, ['A-1'], { GA1: 5 }, ['Cat1'])

    const season = await client.seasons.create(chartKey, new CreateSeasonParams().forSaleConfig(forSaleConfig).forSalePropagated(false))

    expect(season.forSalePropagated).toBe(false)
})
