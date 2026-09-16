import { Region } from '../src/Region.js'
import { SeatsioClient } from '../src/SeatsioClient.js'
import { getConfig } from './support/testEnvironment.js'

test('aborts eventually if server keeps returning 429', async () => {
    const client = new SeatsioClient(new Region(getConfig().httpbinUrl), 'someSecretKey')
    const start = new Date()
    try {
        await client.client.get('/status/429')
        throw new Error('Should have failed')
    } catch (e) {
        expect(String(e)).toContain('/status/429 resulted in 429')
        const waitTime = new Date().getTime() - start.getTime()
        expect(waitTime).toBeGreaterThan(10000)
        expect(waitTime).toBeLessThan(25000)
    }
})

test('aborts directly if server returns error other than 429', async () => {
    const client = new SeatsioClient(new Region(getConfig().httpbinUrl), '')
    const start = new Date()
    try {
        await client.client.get('/status/400')
        throw new Error('Should have failed')
    } catch (e) {
        expect(String(e)).toContain('/status/400 resulted in 400')
        const waitTime = new Date().getTime() - start.getTime()
        expect(waitTime).toBeLessThan(2000)
    }
})

test('aborts directly if server returns 429 but max retries 0', async () => {
    const client = new SeatsioClient(new Region(getConfig().httpbinUrl), '').setMaxRetries(0)
    const start = new Date()
    try {
        await client.client.get('/status/429')
        throw new Error('Should have failed')
    } catch (e) {
        expect(String(e)).toContain('/status/429 resulted in 429')
        const waitTime = new Date().getTime() - start.getTime()
        expect(waitTime).toBeLessThan(2000)
    }
})

test('returns successfully when the server sends a 429 first, but then a successful response', async () => {
    const client = new SeatsioClient(new Region(getConfig().httpbinUrl), '')
    for (let i = 0; i < 20; ++i) {
        const response = await client.client.get('/status/429:0.25,204:0.75')
        expect(response.status).toBe(204)
    }
})
