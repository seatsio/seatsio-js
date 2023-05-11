import { TestUtils } from './TestUtils.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listens to successful requests', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const requestStartedDeferred = TestUtils.deferred()
    const requestEndedDeferred = TestUtils.deferred()

    client.setRequestListener(() => ({
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onRequestStarted: () => requestStartedDeferred.resolve(),
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onRequestEnded: () => requestEndedDeferred.resolve()
    }))

    await client.charts.create()
    await Promise.all([requestStartedDeferred.promise, requestEndedDeferred.promise])
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('listens to unsuccessful requests', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const requestStartedDeferred = TestUtils.deferred()
    const requestEndedDeferred = TestUtils.deferred()

    client.setRequestListener(() => ({
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onRequestStarted: () => requestStartedDeferred.resolve(),
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        onRequestEnded: () => requestEndedDeferred.resolve()
    }))

    try {
        await client.events.create()
    } catch (e) {
        await Promise.all([requestStartedDeferred.promise, requestEndedDeferred.promise])
    }
})
