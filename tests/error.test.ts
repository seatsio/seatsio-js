import { TestUtils } from './testUtils'

test('check error handling', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    expect.assertions(1)
    const errorSnapshot = {
        status: 404,
        messages: ['Chart not found: unexisting chart'],
        errors:
        [{
            code: 'CHART_NOT_FOUND',
            message: 'Chart not found: unexisting chart'
        }],
        warnings: []
    }

    await expect(client.events.create('unexisting chart')).rejects.toMatchObject(errorSnapshot)
})
