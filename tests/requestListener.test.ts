import { TestUtils } from './testUtils'

test('listens to successful requests', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const requestStartedDeferred = TestUtils.deferred()
    const requestEndedDeferred = TestUtils.deferred()

    client.setRequestListener(() => {
        const resolve = requestStartedDeferred.resolve()
        return ({
            onRequestStarted: () => resolve,
            onRequestEnded: () => requestEndedDeferred.resolve()
        })
    })

    await client.charts.create()
    await Promise.all([requestStartedDeferred.promise, requestEndedDeferred.promise])
})

test('listens to unsuccessful requests', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const requestStartedDeferred = TestUtils.deferred()
    const requestEndedDeferred = TestUtils.deferred()

    client.setRequestListener(() => ({
        onRequestStarted: () => requestStartedDeferred?.resolve(),
        onRequestEnded: () => requestEndedDeferred?.resolve()
    }))

    try {
        await client.events.create('unexisting chart')
    } catch (e) {
        await Promise.all([requestStartedDeferred.promise, requestEndedDeferred.promise])
    }
})
