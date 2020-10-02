const testUtils = require('../testUtils.js')
const ObjectProperties = require('../../src/Events/ObjectProperties.js')

test('summaryByStatus', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryByStatus(event.key)

    expect(report).toEqual({
        booked: {
            bySection: { NO_SECTION: 1 },
            count: 1,
            byCategoryKey: { 9: 1 },
            bySelectability: { not_selectable: 1 },
            byCategoryLabel: { Cat1: 1 },
            byChannel: { NO_CHANNEL: 1 }
        },
        free: {
            bySection: { NO_SECTION: 231 },
            count: 231,
            byCategoryKey: { 9: 115, 10: 116 },
            bySelectability: { selectable: 231 },
            byCategoryLabel: { Cat2: 116, Cat1: 115 },
            byChannel: { NO_CHANNEL: 231 }
        }
    })
})

test('summaryByCategoryKey', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryByCategoryKey(event.key)

    expect(report).toEqual({
        9: {
            bySection: { NO_SECTION: 116 },
            count: 116,
            bySelectability: { selectable: 115, not_selectable: 1 },
            byStatus: { booked: 1, free: 115 },
            byChannel: { NO_CHANNEL: 116 }
        },
        10: {
            bySection: { NO_SECTION: 116 },
            count: 116,
            bySelectability: { selectable: 116 },
            byStatus: { free: 116 },
            byChannel: { NO_CHANNEL: 116 }
        }
    })
})

test('summaryByCategoryLabel', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryByCategoryLabel(event.key)

    expect(report).toEqual({
        Cat2: {
            bySection: { NO_SECTION: 116 },
            count: 116,
            bySelectability: { selectable: 116 },
            byStatus: { free: 116 },
            byChannel: { NO_CHANNEL: 116 }
        },
        Cat1: {
            bySection: { NO_SECTION: 116 },
            count: 116,
            bySelectability: { selectable: 115, not_selectable: 1 },
            byStatus: { booked: 1, free: 115 },
            byChannel: { NO_CHANNEL: 116 }
        }
    })
})

test('summaryBySection', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryBySection(event.key)
    expect(report).toEqual({
        NO_SECTION: {
            count: 232,
            byCategoryKey: { 9: 116, 10: 116 },
            bySelectability: { selectable: 231, not_selectable: 1 },
            byStatus: { booked: 1, free: 231 },
            byCategoryLabel: { Cat2: 116, Cat1: 116 },
            byChannel: { NO_CHANNEL: 232 }
        }
    })
})

test('summaryBySelectability', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryBySelectability(event.key)

    expect(report).toEqual({
        selectable: {
            bySection: { NO_SECTION: 231 },
            count: 231,
            byCategoryKey: { 9: 115, 10: 116 },
            byStatus: { free: 231 },
            byCategoryLabel: { Cat2: 116, Cat1: 115 },
            byChannel: { NO_CHANNEL: 231 }
        },
        not_selectable: {
            bySection: { NO_SECTION: 1 },
            count: 1,
            byCategoryKey: { 9: 1 },
            byStatus: { booked: 1 },
            byCategoryLabel: { Cat1: 1 },
            byChannel: { NO_CHANNEL: 1 }
        }
    })
})

test('summaryByChannel', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chartKey = testUtils.getChartKey()
    await testUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.updateChannels(event.key, {
        channel1: { name: 'channel 1', color: 'blue', index: 1 }
    })
    await client.events.assignObjectsToChannel(event.key, { channel1: ['A-1', 'A-2'] })

    const report = await client.eventReports.summaryByChannel(event.key)

    expect(report).toEqual({
        NO_CHANNEL: {
            bySection: { NO_SECTION: 230 },
            count: 230,
            byCategoryKey: { 9: 114, 10: 116 },
            byStatus: { free: 230 },
            byCategoryLabel: { Cat2: 116, Cat1: 114 },
            bySelectability: { selectable: 230 }
        },
        channel1: {
            bySection: { NO_SECTION: 2 },
            count: 2,
            byCategoryKey: { 9: 2 },
            byStatus: { free: 2 },
            byCategoryLabel: { Cat1: 2 },
            bySelectability: { selectable: 2 }
        }
    })
})
