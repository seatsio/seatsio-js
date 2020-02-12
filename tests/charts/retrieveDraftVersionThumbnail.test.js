const testUtils = require('../testUtils.js')

test('should retrieve thumbnail for the draft version of chart', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.events.create(chart.key)
    await client.charts.update(chart.key, 'newName')

    const thumbnail = await client.charts.retrieveDraftVersionThumbnail(chart.key)

    expect(thumbnail).not.toBeFalsy()
})
