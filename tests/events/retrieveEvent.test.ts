import { TestUtils } from '../testUtils'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { SeasonParams } from '../../src/Seasons/SeasonParams'
import { Season } from '../../src/Seasons/Season'
import { Event } from '../../src/Events/Event'

test('should retrieve event', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const now = new Date()
    const event = await client.events.create(chartKey)

    const retrievedEvent = await client.events.retrieve(event.key)

    expect(retrievedEvent.key).toBe(event.key)
    expect(retrievedEvent.id).toBe(event.id)
    expect(retrievedEvent.chartKey).toBe(chartKey)
    expect(retrievedEvent.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(retrievedEvent.supportsBestAvailable).toBe(true)
    expect(retrievedEvent.createdOn).toBeInstanceOf(Date)
    expect(retrievedEvent.createdOn!.getTime()).toBeLessThanOrEqual(now.getTime() + 5000)
    expect(retrievedEvent.forSaleConfig).toBeNull()
    expect(retrievedEvent.updatedOn).toBeNull()
    expect(retrievedEvent.topLevelSeasonKey).toBe(undefined)
    expect(retrievedEvent.categories).toEqual(TestUtils.testChartCategories)
})

test('retrieve season', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason1 = await client.seasons.createPartialSeason(season.key)
    const partialSeason2 = await client.seasons.createPartialSeason(season.key)

    const retrievedSeason = <Season> await client.events.retrieve(season.key)

    expect(retrievedSeason.isSeason()).toBe(true)
    expect(retrievedSeason.isTopLevelSeason).toBe(true)
    expect(retrievedSeason.isPartialSeason).toBe(false)
    expect(retrievedSeason.isEventInSeason).toBe(false)
    expect(retrievedSeason.key).toBeTruthy()
    expect(retrievedSeason.id).toBeTruthy()
    expect(retrievedSeason.partialSeasonKeys).toEqual([partialSeason1.key, partialSeason2.key])
    expect(retrievedSeason.events!.map((e: Event) => e.key)).toEqual(['event1', 'event2'])
    expect(retrievedSeason.chartKey).toBe(chartKey)
    expect(retrievedSeason.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(retrievedSeason.supportsBestAvailable).toBe(true)
    expect(retrievedSeason.createdOn).toBeInstanceOf(Date)
    expect(retrievedSeason.forSaleConfig).toBeNull()
    expect(retrievedSeason.updatedOn).toBeNull()
    expect(retrievedSeason.topLevelSeasonKey).toBe(undefined)
    expect(retrievedSeason.categories).toEqual(TestUtils.testChartCategories)
})

test('retrieve partial season', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().eventKeys(['event1', 'event2']))
    const partialSeason1 = await client.seasons.createPartialSeason(season.key, null, ['event1', 'event2'])
    await client.seasons.createPartialSeason(season.key)

    const retrievedSeason = <Season> await client.events.retrieve(partialSeason1.key)

    expect(retrievedSeason.isSeason()).toBe(true)
    expect(retrievedSeason.isTopLevelSeason).toBe(false)
    expect(retrievedSeason.isPartialSeason).toBe(true)
    expect(retrievedSeason.isEventInSeason).toBe(false)
    expect(retrievedSeason.key).toBeTruthy()
    expect(retrievedSeason.id).toBeTruthy()
    expect(retrievedSeason.partialSeasonKeys).toBe(undefined)
    expect(retrievedSeason.events!.map((e: Event) => e.key)).toEqual(['event1', 'event2'])
    expect(retrievedSeason.chartKey).toBe(chartKey)
    expect(retrievedSeason.tableBookingConfig).toEqual(TableBookingConfig.inherit())
    expect(retrievedSeason.supportsBestAvailable).toBe(true)
    expect(retrievedSeason.createdOn).toBeInstanceOf(Date)
    expect(retrievedSeason.forSaleConfig).toBeNull()
    expect(retrievedSeason.updatedOn).toBeNull()
    expect(retrievedSeason.topLevelSeasonKey).toBe(season.key)
})

test('retrieve event in season', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new SeasonParams().eventKeys(['event1', 'event2']))

    const retrievedEvent = await client.events.retrieve('event1')

    expect(retrievedEvent.isSeason()).toBe(false)
    expect(retrievedEvent.isTopLevelSeason).toBe(false)
    expect(retrievedEvent.isPartialSeason).toBe(false)
    expect(retrievedEvent.isEventInSeason).toBe(true)
    expect(retrievedEvent.topLevelSeasonKey).toBe(season.key)
})
