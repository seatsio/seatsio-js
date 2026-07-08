import { TestUtils } from '../../testUtils.js'
import { EventObjectInfo } from '../../../src/Events/EventObjectInfo.js'
import { ObjectProperties } from '../../../src/Events/ObjectProperties.js'

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
