test('should retrieve thumbnail for the draft version of chart', async () => {
  let chart = await client.charts.create()
  await client.events.create(chart.key)
  await client.charts.update(chart.key, 'newName')

  let thumbnail = await client.charts.retrieveDraftVersionThumbnail(chart.key)

  expect(thumbnail).toContain('<!DOCTYPE svg')
})
