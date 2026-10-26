import { SeatsioClient } from '../src/SeatsioClient.js'
import { Region } from '../src/Region.js'

test('default timeout is 30 seconds', () => {
    const client = new SeatsioClient(Region.EU(), 'secret')

    expect(client.client.defaults.timeout).toBe(30000)
})

test('timeout can be changed', () => {
    const client = new SeatsioClient(Region.EU(), 'secret').setTimeout(60000)

    expect(client.client.defaults.timeout).toBe(60000)
})
