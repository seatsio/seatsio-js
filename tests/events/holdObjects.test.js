const testUtils = require('../testUtils.js')
const ObjectStatus = require('../../src/Events/ObjectStatus.js')

test('should hold objects', async () => {
  let chartKey = testUtils.getChartKey()
  let objectStatus = new ObjectStatus()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let holdToken = await client.holdTokens.create()
  let holdResult = await client.events.hold(event.key, ["A-1", "A-2"], holdToken.holdToken)

  let status1 = await client.events.retrieveObjectStatus(event.key, 'A-1')
  expect(status1.status).toBe(objectStatus.HELD)
  expect(status1.holdToken).toBe(holdToken.holdToken)

  let status2 = await client.events.retrieveObjectStatus(event.key, 'A-2')
  expect(status2.status).toBe(objectStatus.HELD)
  expect(status2.holdToken).toBe(holdToken.holdToken)

  expect(Object.keys(holdResult.objects)).toEqual(['A-1', 'A-2'])
})