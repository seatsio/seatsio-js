const testUtils = require('./testUtils.js')

test('check error handling', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    expect.assertions(1)
    const errorSnapshot = {
        status: 400,
        messages: ['#: required key [chartKey] not found'],
        errors:
        [{
            code: 'GENERAL_ERROR',
            message: '#: required key [chartKey] not found'
        }],
        warnings: []
    }

    await expect(client.events.create()).rejects.toMatchObject(errorSnapshot)
})
