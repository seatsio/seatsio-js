test('should archive a chart', async () => {
  let chart = await client.charts.create()

  await client.charts.moveToArchive(chart.key)

  let retrievedCart = await client.charts.retrieve(chart.key)
  expect(retrievedCart.archived).toBe(true)
})
