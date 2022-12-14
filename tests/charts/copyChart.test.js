const testUtils = require('../testUtils.js')

test('should copy chart', async () => {
    const { client } = await testUtils.createTestUserAndClient()
    const chart = await client.charts.create('My Chart', 'BOOTHS')

    const copiedChart = await client.charts.copy(chart.key)
    expect(copiedChart.name).toEqual('My Chart (copy)')
    expect(copiedChart.key).not.toBe(chart.key)
})
