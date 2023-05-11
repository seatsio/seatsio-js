// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from '../testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('should list all charts in archive', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
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

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(archivedChartKeys.sort()).toEqual([chart1.key, chart2.key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get many archived charts)', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const charts = await TestUtils.createArray(15, async () => {
        const chart = await client.charts.create()
        await client.charts.moveToArchive(chart.key)
        return chart
    })

    const archivedChartKeys = []
    for await (const chart of client.charts.archive.all()) {
        archivedChartKeys.push(chart.key)
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(archivedChartKeys.sort()).toEqual(charts.map(c => c.key).sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get first page of archived charts', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const charts = await TestUtils.createArray(3, async () => {
        const chart = await client.charts.create()
        await client.charts.moveToArchive(chart.key)
        return chart
    })

    const firstPage = await client.charts.archive.firstPage()

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items.length).toBe(3)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items.map((c: any) => c.key).sort()).toEqual(charts.map(c => c.key).sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get first page of archived charts with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
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

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items.length).toBe(2)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(firstPage.items.map((c: any) => c.key).sort()).toEqual([chart2.key, chart3.key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get page after given archived charts id', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
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

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items.length).toBe(2)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.previousPageEndsBefore).toEqual(chart2.id + '')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items.map((c: any) => c.key).sort()).toEqual([chart1.key, chart2.key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get page after given archived charts id with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
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

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items.length).toBe(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.previousPageEndsBefore).toEqual(chart2.id + '')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items[0].key).toBe(chart2.key)
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get page before given archived charts id', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
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

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items.length).toBe(2)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.nextPageStartsAfter).toEqual(chart2.id + '')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items.map((c: any) => c.key).sort()).toEqual([chart2.key, chart3.key].sort())
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('get page after given archived charts id with page size', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
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

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items.length).toBe(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.previousPageEndsBefore).toEqual(chart2.id + '')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(page.items[0].key).toBe(chart2.key)
})
