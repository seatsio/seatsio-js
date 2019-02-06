const testUtils = require('../testUtils.js')

test('should update extra data of an event', async () => {
  let chartKey = testUtils.getChartKey()
  await testUtils.createTestChart(chartKey, user.designerKey)
  let event = await client.events.create(chartKey)
  let extraData = {'foo': 'bar'}

  await client.events.updateExtraData(event.key, 'A-1', extraData)

  let objStatus = await client.events.retrieveObjectStatus(event.key, 'A-1')
  expect(objStatus.extraData).toEqual(extraData)
})
