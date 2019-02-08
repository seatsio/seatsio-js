const testUtils = require('./testUtils.js')

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

test('check error handling when there is no error.response.data', async () => {
  expect.assertions(1)
  let newClient = testUtils.createClient('invalid_key')
  await expect(newClient.accounts.retrieveMyAccount()).rejects.toEqual('get https://api-staging.seatsio.net/accounts/me resulted in 401  Unauthorized  error')
})
