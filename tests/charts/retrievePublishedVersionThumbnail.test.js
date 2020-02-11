const testUtils = require('../testUtils.js')

test('should retrieve thumbnail for the published version of chart', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    const thumbnail = await client.charts.retrievePublishedVersionThumbnail(chart.key)

    expect(thumbnail).not.toBeFalsy()
})
