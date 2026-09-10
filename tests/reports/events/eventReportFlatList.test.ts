import { TestUtils } from '../../testUtils.js'
import { EventObjectInfo } from '../../../src/Events/EventObjectInfo.js'
import { ObjectProperties } from '../../../src/Events/ObjectProperties.js'
import { CreateSeasonParams } from '../../../src/Seasons/CreateSeasonParams.js'

test('flatList returns flat list of EventObjectInfo sorted by label', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, new ObjectProperties('A-1'))

    const report = await client.eventReports.flatList(event.key)

    expect(Array.isArray(report)).toBe(true)
    expect(report[0]).toBeInstanceOf(EventObjectInfo)
    expect(report[0].label).toBe('A-1')
    expect(report[0].status).toBe(EventObjectInfo.BOOKED)
    expect(report[1].label).toBe('A-2')
    expect(report[1].status).toBe(EventObjectInfo.FREE)
})

test('flatList with season bookings not propagated', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const season = await client.seasons.create(chartKey, new CreateSeasonParams().numberOfEvents(1))
    const event = season.events![0]
    await client.events.book(season.key, ['A-1', 'A-2'])
    await client.events.book(event.key, ['A-3'])

    const reportWithPropagation = await client.eventReports.flatList(season.key)
    const reportWithoutPropagation = await client.eventReports.withSeasonBookingsNotPropagated().flatList(season.key)

    const findByLabel = (report: EventObjectInfo[], label: string) => report.find(item => item.label === label)

    expect(findByLabel(reportWithPropagation, 'A-3')!.status).toBe(EventObjectInfo.BOOKED)
    expect(findByLabel(reportWithoutPropagation, 'A-3')!.status).not.toBe(EventObjectInfo.BOOKED)
})

test('flatListCsv returns a plain string', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, new ObjectProperties('A-1'))

    const csv = await client.eventReports.flatListCsv(event.key)

    expect(typeof csv).toBe('string')
    expect(csv).toContain('A-1')
    expect(csv).toContain(EventObjectInfo.BOOKED)
})
