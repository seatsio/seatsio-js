import { TestUtils } from '../testUtils'
import { SeasonParams } from '../../src/Seasons/SeasonParams'
import { Event } from '../../src/Events/Event'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'

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

    const season = await client.seasons.create(chart.key, new SeasonParams().key('aSeason'))

    expect(season.key).toBe('aSeason')
})

test('number of events can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new SeasonParams().numberOfEvents(2))

    expect(season.events!.length).toBe(2)
})

test('event keys can be passed in', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const season = await client.seasons.create(chart.key, new SeasonParams().eventKeys(['event1', 'event2']))

    expect(season.events!.map((event: Event) => event.key)).toEqual(['event1', 'event2'])
})

test('table booking config can be passed in', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const tableBookingConfig = TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })

    const season = await client.seasons.create(chartKey, new SeasonParams().tableBookingConfig(tableBookingConfig))

    expect(season.tableBookingConfig).toEqual(tableBookingConfig)
})
