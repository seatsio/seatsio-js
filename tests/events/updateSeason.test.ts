import { TestUtils } from '../testUtils'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { Category } from '../../src/Charts/Category'
import { UpdateSeasonParams } from '../../src/Seasons/UpdateSeasonParams'
import { CreateSeasonParams } from '../../src/Seasons/CreateSeasonParams'

test('should update event key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    await client.seasons.update(season.key, new UpdateSeasonParams().withKey('newKey'))

    const retrievedSeason = await client.seasons.retrieve('newKey')
    expect(retrievedSeason.chartKey).toBe(chart.key)
    expect(retrievedSeason.key).toBe('newKey')
    expect(retrievedSeason.isInThePast).toBe(false)
})

test('should update tableBookingConfig parameter of a season', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey)

    await client.seasons.update(season.key, new UpdateSeasonParams().withTableBookingConfig(TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })))

    const retrievedSeason = await client.seasons.retrieve(season.key)
    expect(retrievedSeason.chartKey).toBe(chartKey)
    expect(retrievedSeason.key).toBe(season.key)
    expect(retrievedSeason.tableBookingConfig).toEqual(TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' }))
})

test('it supports object categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const season = await client.seasons.create(chartKey, new CreateSeasonParams().objectCategories({ 'A-1': 9 }))

    await client.seasons.update(season.key, new UpdateSeasonParams().withObjectCategories({ 'A-1': 10 }))

    const retrievedSeason = await client.seasons.retrieve(season.key)
    expect(retrievedSeason.objectCategories).toEqual({ 'A-1': 10 })
})

test('it supports updating the categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const category = new Category('eventCat1', 'Event Level Category', '#AAABBB', false)
    const newCategory = new Category('eventCat2', 'Event Level Category 2', '#BBBCCC', false)
    const season = await client.seasons.create(chartKey, new CreateSeasonParams().categories([category]))

    await client.seasons.update(season.key, new UpdateSeasonParams().withCategories([newCategory]))

    const retrievedSeason = await client.seasons.retrieve(season.key)
    expect(retrievedSeason.categories!.length).toEqual(4) // 3 from sampleChart.json, 1 event level category
    expect(retrievedSeason.categories!.filter((cat: Category) => cat.key === 'eventCat1').length).toEqual(0)
    expect(retrievedSeason.categories!.filter((cat: Category) => cat.key === 'eventCat2').length).toEqual(1)
    expect(retrievedSeason.categories!.filter((cat: Category) => cat.key === 'eventCat2')[0].label).toEqual('Event Level Category 2')
    expect(retrievedSeason.categories!.filter((cat: Category) => cat.key === 'eventCat2')[0].color).toEqual('#BBBCCC')
})

test('should update name', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    await client.seasons.update(season.key, new UpdateSeasonParams().withName('My season'))

    const retrievedSeason = await client.seasons.retrieve(season.key)
    expect(retrievedSeason.name).toBe('My season')
})

test('should update forSalePropagated flag', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const season = await client.seasons.create(chart.key)

    await client.seasons.update(season.key, new UpdateSeasonParams().withForSalePropagated(false))

    const retrievedSeason = await client.seasons.retrieve(season.key)
    expect(retrievedSeason.forSalePropagated).toBe(false)
})
