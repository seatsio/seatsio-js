import { TestUtils } from '../testUtils'

test('should archive a chart', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()

    await client.charts.moveToArchive(chart.key)

    const retrievedCart = await client.charts.retrieve(chart.key)
    expect(retrievedCart.archived).toBe(true)
})
