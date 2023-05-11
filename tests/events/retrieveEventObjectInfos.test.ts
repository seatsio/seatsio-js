import { TestUtils } from '../TestUtils'
import { EventObjectInfo } from '../../src/Events/EventObjectInfo.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should retrieve event object infos', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)

    const objectInfos = await client.events.retrieveObjectInfos(event.key, ['A-1', 'A-2'])

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfos['A-1'].status).toEqual(EventObjectInfo.FREE)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfos['A-2'].status).toEqual(EventObjectInfo.FREE)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfos['A-3']).toBe(undefined)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('holds', async () => {
    const { client, user } = await TestUtils.createTestUserAndClient()
    const chartKey = TestUtils.getChartKey()
    await TestUtils.createTestChart(chartKey, user.secretKey)
    const event = await client.events.create(chartKey)
    const holdToken = await client.holdTokens.create()
    await client.events.hold(event.key, 'GA1', holdToken.holdToken)

    const objectInfos = await client.events.retrieveObjectInfos(event.key, ['GA1'])

    const expectedHolds = {}
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    expectedHolds[holdToken.holdToken] = { NO_TICKET_TYPE: 1 }
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(objectInfos.GA1.holds).toEqual(expectedHolds)
})
