import { TestUtils } from '../testUtils'

test('should list all event log items', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.charts.update(chart.key, 'a chart')

    await TestUtils.sleep(2000)

    const eventLogItems = []
    for await (const eventLogItem of client.eventLog.listAll()) {
        eventLogItems.push(eventLogItem)
    }

    expect(eventLogItems.map(eventLogItem => eventLogItem.type)).toEqual(['chart.created', 'chart.published'])
})

test('properties', async () => {
    const { client, workspace } = await TestUtils.createTestUserAndClient()
    const chart = await client.charts.create()
    await client.charts.update(chart.key, 'a chart')

    await TestUtils.sleep(2000)

    const eventLogItems = await client.eventLog.listFirstPage()
    const eventLogItem = eventLogItems.items[0]

    expect(eventLogItem.id).toBeGreaterThan(0)
    expect(eventLogItem.type).toEqual('chart.created')
    expect(eventLogItem.workspaceKey).toEqual(workspace.key)
    expect(eventLogItem.date).toBeTruthy()
    expect(eventLogItem.data).toEqual({ key: chart.key })
})
