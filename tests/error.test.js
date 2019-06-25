test('check error handling', async () => {
    expect.assertions(1)
    let errorSnapshot = {
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
