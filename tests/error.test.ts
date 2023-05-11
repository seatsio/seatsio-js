import { TestUtils } from './testUtils'

test('check error handling', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
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
