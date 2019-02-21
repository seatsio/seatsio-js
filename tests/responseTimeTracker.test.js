const testUtils = require('./testUtils.js')

test('track response time for successful request', async (done) => {
  let client = testUtils.createClient(user.secretKey)
  client.setResponseTimeTracker(responseTime => {
    expect(responseTime).toBeGreaterThan(0)
    expect(responseTime).toBeLessThan(10000)
    done()
  })

  await client.charts.create()
})
