test('should retrieve thumbnail for the published version of chart', async () => {
  let chart = await client.charts.create()

  let thumbnail = await client.charts.retrievePublishedVersionThumbnail(chart.key)

  expect(thumbnail).toContain('<!DOCTYPE svg')
})
