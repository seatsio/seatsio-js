const testUtils = require('./testUtils.js')

test('tracks response time for successful requests', done => {
  let client = testUtils.createClient(user.secretKey)

  client.setResponseTimeTracker(responseTime => {
    expect(responseTime).toBeGreaterThan(0)
    expect(responseTime).toBeLessThan(10000)
    done()
  })

  client.charts.create()
})

test('tracks response time for failed requests', async done => {
  let client = testUtils.createClient(user.secretKey)

  client.setResponseTimeTracker(responseTime => {
    expect(responseTime).toBeGreaterThan(0)
    expect(responseTime).toBeLessThan(10000)
    done()
  })

  try {
    await client.events.create()
  } catch(e) {
  }
})
