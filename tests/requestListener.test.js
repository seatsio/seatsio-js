const testUtils = require('./testUtils.js')

test('listens to successful requests', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const requestStartedDeferred = testUtils.deferred()
    const requestEndedDeferred = testUtils.deferred()

    client.setRequestListener(() => ({
        onRequestStarted: () => requestStartedDeferred.resolve(),
        onRequestEnded: () => requestEndedDeferred.resolve()
    }))

    await client.charts.create()
    await Promise.all([requestStartedDeferred.promise, requestEndedDeferred.promise])
})

test('listens to unsuccessful requests', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const requestStartedDeferred = testUtils.deferred()
    const requestEndedDeferred = testUtils.deferred()

    client.setRequestListener(() => ({
        onRequestStarted: () => requestStartedDeferred.resolve(),
        onRequestEnded: () => requestEndedDeferred.resolve()
    }))

    try {
        await client.events.create()
    } catch (e) {
        await Promise.all([requestStartedDeferred.promise, requestEndedDeferred.promise])
    }
})
