test('listAll events when there are more than 20 events)', async () => {
  let chart = await client.charts.create()
  let generatedEventKeys = [], retrievedEventKeys = []
  for (let i = 0; i < 25; i++) {
    let event = await client.events.create(chart.key)
    generatedEventKeys.push(event.key)
  }

  for await (let event of client.events.listAll()) {
    retrievedEventKeys.push(event.key)
  }

  expect(retrievedEventKeys.sort()).toEqual(generatedEventKeys.sort())
})

test('listAll with more than 40 events)', async () => {
  let chart = await client.charts.create()
  let generatedEventKeys = [], retrievedEventKeys = []
  for (let i = 0; i < 45; i++) {
    let event = await client.events.create(chart.key)
    generatedEventKeys.push(event.key)
  }

  for await (let event of client.events.listAll()) {
    retrievedEventKeys.push(event.key)
  }

  expect(retrievedEventKeys.sort()).toEqual(generatedEventKeys.sort())
})
