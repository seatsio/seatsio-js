import { TestUtils } from '../../testUtils'
import { ObjectProperties } from '../../../src/Events/ObjectProperties'
import { CreateEventParams } from '../../../src/Events/CreateEventParams'
import { Channel } from '../../../src/Events/Channel'

test('summaryByStatus', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryByStatus(event.key)

    expect(report).toEqual({
        booked: {
            bySection: { NO_SECTION: 1 },
            byObjectType: { seat: 1 },
            count: 1,
            byCategoryKey: { 9: 1 },
            bySelectability: { not_selectable: 1 },
            byAvailability: { not_available: 1 },
            byAvailabilityReason: { booked: 1 },
            byCategoryLabel: { Cat1: 1 },
            byChannel: { NO_CHANNEL: 1 },
            byZone: { NO_ZONE: 1 }
        },
        free: {
            bySection: { NO_SECTION: 231 },
            byObjectType: { generalAdmission: 200, seat: 31 },
            count: 231,
            byCategoryKey: { 9: 115, 10: 116 },
            bySelectability: { selectable: 231 },
            byAvailability: { available: 231 },
            byAvailabilityReason: { available: 231 },
            byCategoryLabel: { Cat2: 116, Cat1: 115 },
            byChannel: { NO_CHANNEL: 231 },
            byZone: { NO_ZONE: 231 }
        }
    })
})

test('summaryByObjectType', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.summaryByObjectType(event.key)

    expect(report).toEqual({
        seat: {
            bySection: { NO_SECTION: 32 },
            byStatus: { free: 32 },
            count: 32,
            byCategoryKey: { 9: 16, 10: 16 },
            bySelectability: { selectable: 32 },
            byAvailability: { available: 32 },
            byAvailabilityReason: { available: 32 },
            byCategoryLabel: { Cat1: 16, Cat2: 16 },
            byChannel: { NO_CHANNEL: 32 },
            byZone: { NO_ZONE: 32 }
        },
        generalAdmission: {
            count: 200,
            bySection: { NO_SECTION: 200 },
            byStatus: { free: 200 },
            byCategoryKey: { 9: 100, 10: 100 },
            bySelectability: { selectable: 200 },
            byAvailability: { available: 200 },
            byAvailabilityReason: { available: 200 },
            byCategoryLabel: { Cat2: 100, Cat1: 100 },
            byChannel: { NO_CHANNEL: 200 },
            byZone: { NO_ZONE: 200 }
        },
        table: {
            count: 0,
            bySection: { },
            byStatus: { },
            byCategoryKey: { },
            bySelectability: { },
            byAvailability: { },
            byAvailabilityReason: { },
            byCategoryLabel: { },
            byChannel: { },
            byZone: { }
        },
        booth: {
            count: 0,
            bySection: { },
            byStatus: { },
            byCategoryKey: { },
            bySelectability: { },
            byAvailability: { },
            byAvailabilityReason: { },
            byCategoryLabel: { },
            byChannel: { },
            byZone: { }
        }
    })
})

test('summaryByCategoryKey', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryByCategoryKey(event.key)

    expect(report).toEqual({
        9: {
            count: 116,
            bySection: { NO_SECTION: 116 },
            bySelectability: { selectable: 115, not_selectable: 1 },
            byAvailability: { available: 115, not_available: 1 },
            byAvailabilityReason: { available: 115, booked: 1 },
            byStatus: { booked: 1, free: 115 },
            byChannel: { NO_CHANNEL: 116 },
            byObjectType: {
                generalAdmission: 100,
                seat: 16
            },
            byZone: { NO_ZONE: 116 }
        },
        10: {
            count: 116,
            bySection: { NO_SECTION: 116 },
            bySelectability: { selectable: 116 },
            byAvailability: { available: 116 },
            byAvailabilityReason: { available: 116 },
            byStatus: { free: 116 },
            byChannel: { NO_CHANNEL: 116 },
            byObjectType: {
                generalAdmission: 100,
                seat: 16
            },
            byZone: { NO_ZONE: 116 }
        },
        string11: {
            count: 0,
            bySection: { },
            bySelectability: { },
            byAvailability: { },
            byAvailabilityReason: { },
            byStatus: { },
            byChannel: { },
            byObjectType: { },
            byZone: { }
        },
        NO_CATEGORY: {
            count: 0,
            bySection: { },
            bySelectability: { },
            byAvailability: { },
            byAvailabilityReason: { },
            byStatus: { },
            byChannel: { },
            byObjectType: { },
            byZone: { }
        }
    })
})

test('summaryByCategoryLabel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryByCategoryLabel(event.key)

    expect(report).toEqual({
        Cat2: {
            count: 116,
            bySection: { NO_SECTION: 116 },
            bySelectability: { selectable: 116 },
            byAvailability: { available: 116 },
            byAvailabilityReason: { available: 116 },
            byStatus: { free: 116 },
            byChannel: { NO_CHANNEL: 116 },
            byObjectType: {
                generalAdmission: 100,
                seat: 16
            },
            byZone: { NO_ZONE: 116 }
        },
        Cat1: {
            count: 116,
            bySection: { NO_SECTION: 116 },
            bySelectability: { selectable: 115, not_selectable: 1 },
            byAvailability: { available: 115, not_available: 1 },
            byAvailabilityReason: { available: 115, booked: 1 },
            byStatus: { booked: 1, free: 115 },
            byChannel: { NO_CHANNEL: 116 },
            byObjectType: {
                generalAdmission: 100,
                seat: 16
            },
            byZone: { NO_ZONE: 116 }
        },
        Cat3: {
            count: 0,
            bySection: { },
            bySelectability: { },
            byAvailability: { },
            byAvailabilityReason: { },
            byStatus: { },
            byChannel: { },
            byObjectType: { },
            byZone: { }
        },
        NO_CATEGORY: {
            count: 0,
            bySection: { },
            bySelectability: { },
            byAvailability: { },
            byAvailabilityReason: { },
            byStatus: { },
            byChannel: { },
            byObjectType: { },
            byZone: { }
        }
    })
})

test('summaryBySection', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryBySection(event.key)
    expect(report).toEqual({
        NO_SECTION: {
            count: 232,
            byCategoryKey: { 9: 116, 10: 116 },
            bySelectability: { selectable: 231, not_selectable: 1 },
            byAvailability: { available: 231, not_available: 1 },
            byAvailabilityReason: { available: 231, booked: 1 },
            byStatus: { booked: 1, free: 231 },
            byCategoryLabel: { Cat2: 116, Cat1: 116 },
            byChannel: { NO_CHANNEL: 232 },
            byObjectType: {
                generalAdmission: 200,
                seat: 32
            },
            byZone: { NO_ZONE: 232 }
        }
    })
})

test('summaryByZone', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithZones(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const report = await client.eventReports.summaryByZone(event.key)
    expect(report).toEqual({
        finishline: {
            count: 2865,
            byCategoryKey: { 1: 2865 },
            byCategoryLabel: { 'Goal Stands': 2865 },
            byObjectType: { seat: 2865 },
            bySection: { 'Goal Stand 3': 2215, 'Goal Stand 4': 650 },
            byStatus: { free: 2865 },
            byAvailability: { available: 2865 },
            byAvailabilityReason: { available: 2865 },
            bySelectability: { selectable: 2865 },
            byChannel: { NO_CHANNEL: 2865 }
        },
        midtrack: {
            count: 6032,
            byCategoryKey: { 2: 6032 },
            byCategoryLabel: { 'Mid Track Stand': 6032 },
            byObjectType: { seat: 6032 },
            bySection: { MT1: 2418, MT3: 3614 },
            byStatus: { free: 6032 },
            byAvailability: { available: 6032 },
            byAvailabilityReason: { available: 6032 },
            bySelectability: { selectable: 6032 },
            byChannel: { NO_CHANNEL: 6032 }
        },
        NO_ZONE: {
            count: 0,
            byCategoryKey: {},
            byCategoryLabel: {},
            byObjectType: {},
            bySection: {},
            byStatus: {},
            byAvailability: {},
            byAvailabilityReason: {},
            bySelectability: {},
            byChannel: {}
        }
    })
})

test('summaryByAvailability', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryByAvailability(event.key)

    expect(report).toEqual({
        available: {
            bySection: { NO_SECTION: 231 },
            count: 231,
            byCategoryKey: { 9: 115, 10: 116 },
            bySelectability: { selectable: 231 },
            byAvailabilityReason: { available: 231 },
            byStatus: { free: 231 },
            byCategoryLabel: { Cat2: 116, Cat1: 115 },
            byChannel: { NO_CHANNEL: 231 },
            byObjectType: {
                generalAdmission: 200,
                seat: 31
            },
            byZone: { NO_ZONE: 231 }
        },
        not_available: {
            bySection: { NO_SECTION: 1 },
            count: 1,
            byCategoryKey: { 9: 1 },
            bySelectability: { not_selectable: 1 },
            byAvailabilityReason: { booked: 1 },
            byStatus: { booked: 1 },
            byCategoryLabel: { Cat1: 1 },
            byChannel: { NO_CHANNEL: 1 },
            byObjectType: {
                seat: 1
            },
            byZone: { NO_ZONE: 1 }
        }
    })
})

test('summaryByAvailabilityReason', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    await client.events.book(event.key, (new ObjectProperties('A-1')))

    const report = await client.eventReports.summaryByAvailabilityReason(event.key)

    expect(report).toEqual({
        available: {
            bySection: { NO_SECTION: 231 },
            count: 231,
            byCategoryKey: { 9: 115, 10: 116 },
            bySelectability: { selectable: 231 },
            byAvailability: { available: 231 },
            byStatus: { free: 231 },
            byCategoryLabel: { Cat2: 116, Cat1: 115 },
            byChannel: { NO_CHANNEL: 231 },
            byObjectType: {
                generalAdmission: 200,
                seat: 31
            },
            byZone: { NO_ZONE: 231 }
        },
        booked: {
            bySection: { NO_SECTION: 1 },
            count: 1,
            byCategoryKey: { 9: 1 },
            bySelectability: { not_selectable: 1 },
            byAvailability: { not_available: 1 },
            byStatus: { booked: 1 },
            byCategoryLabel: { Cat1: 1 },
            byChannel: { NO_CHANNEL: 1 },
            byObjectType: {
                seat: 1
            },
            byZone: { NO_ZONE: 1 }
        },
        disabled_by_social_distancing: {
            count: 0,
            bySection: { },
            byCategoryKey: { },
            bySelectability: { },
            byAvailability: { },
            byStatus: { },
            byCategoryLabel: { },
            byChannel: { },
            byObjectType: { },
            byZone: { }
        },
        not_for_sale: {
            count: 0,
            bySection: { },
            byCategoryKey: { },
            bySelectability: { },
            byAvailability: { },
            byStatus: { },
            byCategoryLabel: { },
            byChannel: { },
            byObjectType: { },
            byZone: { }
        },
        reservedByToken: {
            count: 0,
            bySection: { },
            byCategoryKey: { },
            bySelectability: { },
            byAvailability: { },
            byStatus: { },
            byCategoryLabel: { },
            byChannel: { },
            byObjectType: { },
            byZone: { }
        }
    })
})

test('summaryByChannel', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withChannels([
        new Channel({ key: 'channel1', name: 'channel 1', color: 'blue', index: 1, objects: ['A-1', 'A-2'] })
    ]))

    const report = await client.eventReports.summaryByChannel(event.key)

    expect(report).toEqual({
        NO_CHANNEL: {
            bySection: { NO_SECTION: 230 },
            count: 230,
            byCategoryKey: { 9: 114, 10: 116 },
            byStatus: { free: 230 },
            byCategoryLabel: { Cat2: 116, Cat1: 114 },
            bySelectability: { selectable: 230 },
            byAvailabilityReason: { available: 230 },
            byAvailability: { available: 230 },
            byObjectType: {
                generalAdmission: 200,
                seat: 30
            },
            byZone: { NO_ZONE: 230 }
        },
        channel1: {
            bySection: { NO_SECTION: 2 },
            count: 2,
            byCategoryKey: { 9: 2 },
            byStatus: { free: 2 },
            byCategoryLabel: { Cat1: 2 },
            bySelectability: { selectable: 2 },
            byAvailability: { available: 2 },
            byAvailabilityReason: { available: 2 },
            byObjectType: {
                seat: 2
            },
            byZone: { NO_ZONE: 2 }
        }
    })
})
