test('should mark everything as for sale', async () => {
    let chart = await client.charts.create()
    let event = await client.events.create(chart.key)
    await client.events.markAsForSale(event.key, ['o1', '02'], ['cat1', 'cat2'])

    await client.events.markEverythingAsForSale(event.key)

    let retrievedEvent = await client.events.retrieve(event.key)
    expect(retrievedEvent.forSaleConfig).toBeFalsy()
})
