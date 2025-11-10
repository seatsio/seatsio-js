import { TableBookingConfig } from '../../src/Events/TableBookingConfig'
import { Category } from '../../src/Charts/Category'
import { TestUtils } from '../testUtils'
import { LocalDate } from '../../src/LocalDate'
import { CreateEventParams } from '../../src/Events/CreateEventParams'
import { UpdateEventParams } from '../../src/Events/UpdateEventParams'
import { CreateSeasonParams } from '../../src/Seasons/CreateSeasonParams'

test('should update event key', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.update(event.key, new UpdateEventParams().withKey('newKey'))

    const retrievedEvent = await client.events.retrieve('newKey')
    expect(retrievedEvent.chartKey).toBe(chart.key)
    expect(retrievedEvent.key).toBe('newKey')
    expect(retrievedEvent.isInThePast).toBe(false)
})

test('should mark the event as in the past', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.seasons.create(chart.key, new CreateSeasonParams().eventKeys(['event1', 'event2']))

    await client.events.update('event1', new UpdateEventParams().withIsInThePast(true))

    const retrievedEvent = await client.events.retrieve('event1')
    expect(retrievedEvent.chartKey).toBe(chart.key)
    expect(retrievedEvent.isInThePast).toBe(true)
})

test('should update tableBookingConfig parameter of an event', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    await client.events.update(event.key, new UpdateEventParams().withTableBookingConfig(TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' })))

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.chartKey).toBe(chartKey)
    expect(retrievedEvent.key).toBe(event.key)
    expect(retrievedEvent.tableBookingConfig).toEqual(TableBookingConfig.custom({ T1: 'BY_TABLE', T2: 'BY_SEAT' }))
})

test('it supports object categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, new CreateEventParams().withObjectCategories({ 'A-1': 9 }))

    await client.events.update(event.key, new UpdateEventParams().withObjectCategories({ 'A-1': 10 }))

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.objectCategories).toEqual({ 'A-1': 10 })
})

test('it supports removing the object categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)

    const event = await client.events.create(chartKey, new CreateEventParams().withObjectCategories({ 'A-2': 9 }))

    await client.events.update(event.key, new UpdateEventParams().withObjectCategories({ }))

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.objectCategories).toBeUndefined()
})

test('it supports updating the categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB', false)
    const newEventCategory = new Category('eventCat2', 'Event Level Category 2', '#BBBCCC', false)
    const event = await client.events.create(chartKey, new CreateEventParams().withCategories([eventCategory]))

    await client.events.update(event.key, new UpdateEventParams().withCategories([newEventCategory]))

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.categories!.length).toEqual(4) // 3 from sampleChart.json, 1 event level category
    expect(retrievedEvent.categories!.filter((cat: Category) => cat.key === 'eventCat1').length).toEqual(0)
    expect(retrievedEvent.categories!.filter((cat: Category) => cat.key === 'eventCat2').length).toEqual(1)
    expect(retrievedEvent.categories!.filter((cat: Category) => cat.key === 'eventCat2')[0].label).toEqual('Event Level Category 2')
    expect(retrievedEvent.categories!.filter((cat: Category) => cat.key === 'eventCat2')[0].color).toEqual('#BBBCCC')
})

test('it supports removing categories', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const eventCategory = new Category('eventCat1', 'Event Level Category', '#AAABBB', false)
    const event = await client.events.create(chartKey, new CreateEventParams().withCategories([eventCategory]))

    await client.events.update(event.key, new UpdateEventParams().withCategories([]))

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.categories!.length).toEqual(3) // 3 from sampleChart.json, event level category was removed
})

test('should update name', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.update(event.key, new UpdateEventParams().withName('My event'))

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.name).toBe('My event')
})

test('should update date', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    const event = await client.events.create(chart.key)

    await client.events.update(event.key, new UpdateEventParams().withDate(new LocalDate(2020, 10, 2)))

    const retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.date).toEqual(new LocalDate(2020, 10, 2))
})
