import { TestUtils } from '../testUtils.js'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo.js'
import { AreaTypes } from '../../src/Common/AreaType.js'
import { TableTypes } from '../../src/Common/TableType.js'
import { CreateEventParams } from '../../src/Events/CreateEventParams.js'
import { TableBookingConfig } from '../../src/Events/TableBookingConfig.js'

test('should retrieve event object info', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'A-1')

    expect(objectInfo.status).toEqual(EventObjectInfo.FREE)
    expect(objectInfo.ticketType).toBeUndefined()
    expect(objectInfo.extraData).toBeUndefined()
    expect(objectInfo.forSale).toBe(true)
    expect(objectInfo.areaType).toBeUndefined()
    expect(objectInfo.tableType).toBeUndefined()
})

test('should retrieve area type of a GA area', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'GA1')

    expect(objectInfo.areaType).toBe(AreaTypes.GENERAL_ADMISSION)
})

test('should retrieve table type of a table', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChartWithTables(chartKey, user.secretKey)
    const event = await client.events.create(chartKey, new CreateEventParams().withTableBookingConfig(TableBookingConfig.allByTable()))

    const objectInfo = await client.events.retrieveObjectInfo(event.key, 'T1')

    expect(objectInfo.tableType).toBe(TableTypes.BOOK_BY_TABLE)
})
