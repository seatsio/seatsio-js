const testUtils = require('../testUtils.js')

test('should list all charts in archive', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const archivedChartKeys = []
    const promises = [
        client.charts.create(),
        client.charts.moveToArchive(chart1.key),
        client.charts.moveToArchive(chart2.key)
    ]
    await Promise.all(promises)

    for await (const chart of client.charts.archive.all()) {
        archivedChartKeys.push(chart.key)
    }

    expect(archivedChartKeys.sort()).toEqual([chart1.key, chart2.key].sort())
})

test('get many archived charts)', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const charts = await testUtils.createArray(15, async () => {
        const chart = await client.charts.create()
        await client.charts.moveToArchive(chart.key)
        return chart
    })

    const archivedChartKeys = []
    for await (const chart of client.charts.archive.all()) {
        archivedChartKeys.push(chart.key)
    }

    expect(archivedChartKeys.sort()).toEqual(charts.map(c => c.key).sort())
})

test('get first page of archived charts', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const charts = await testUtils.createArray(3, async () => {
        const chart = await client.charts.create()
        await client.charts.moveToArchive(chart.key)
        return chart
    })

    const firstPage = await client.charts.archive.firstPage()

    expect(firstPage.items.length).toBe(3)
    expect(firstPage.items.map(c => c.key).sort()).toEqual(charts.map(c => c.key).sort())
})

test('get first page of archived charts with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const chart3 = await client.charts.create()
    const promises = [
        client.charts.moveToArchive(chart1.key),
        client.charts.moveToArchive(chart2.key),
        client.charts.moveToArchive(chart3.key)
    ]
    await Promise.all(promises)

    const firstPage = await client.charts.archive.firstPage(null, 2)

    expect(firstPage.items.length).toBe(2)
    expect(firstPage.items.map(c => c.key).sort()).toEqual([chart2.key, chart3.key].sort())
})

test('get page after given archived charts id', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const chart3 = await client.charts.create()
    const promises = [
        client.charts.moveToArchive(chart1.key),
        client.charts.moveToArchive(chart2.key),
        client.charts.moveToArchive(chart3.key)
    ]
    await Promise.all(promises)

    const page = await client.charts.archive.pageAfter(chart3.id)

    expect(page.items.length).toBe(2)
    expect(page.previousPageEndsBefore).toEqual(chart2.id + '')
    expect(page.items.map(c => c.key).sort()).toEqual([chart1.key, chart2.key].sort())
})

test('get page after given archived charts id with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const chart3 = await client.charts.create()
    const promises = [
        client.charts.moveToArchive(chart1.key),
        client.charts.moveToArchive(chart2.key),
        client.charts.moveToArchive(chart3.key)
    ]
    await Promise.all(promises)

    const page = await client.charts.archive.pageAfter(chart3.id, null, 1)

    expect(page.items.length).toBe(1)
    expect(page.previousPageEndsBefore).toEqual(chart2.id + '')
    expect(page.items[0].key).toBe(chart2.key)
})

test('get page before given archived charts id', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const chart3 = await client.charts.create()
    const promises = [
        client.charts.moveToArchive(chart1.key),
        client.charts.moveToArchive(chart2.key),
        client.charts.moveToArchive(chart3.key)
    ]
    await Promise.all(promises)

    const page = await client.charts.archive.pageBefore(chart1.id)

    expect(page.items.length).toBe(2)
    expect(page.nextPageStartsAfter).toEqual(chart2.id + '')
    expect(page.items.map(c => c.key).sort()).toEqual([chart2.key, chart3.key].sort())
})

test('get page after given archived charts id with page size', async () => {
    const { client, user } = await testUtils.createTestUserAndClient()
    const chart1 = await client.charts.create()
    const chart2 = await client.charts.create()
    const chart3 = await client.charts.create()
    const promises = [
        client.charts.moveToArchive(chart1.key),
        client.charts.moveToArchive(chart2.key),
        client.charts.moveToArchive(chart3.key)
    ]
    await Promise.all(promises)

    const page = await client.charts.archive.pageBefore(chart1.id, null, 1)

    expect(page.items.length).toBe(1)
    expect(page.previousPageEndsBefore).toEqual(chart2.id + '')
    expect(page.items[0].key).toBe(chart2.key)
})
