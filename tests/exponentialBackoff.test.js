const Region = require('../src/Region')
const { SeatsioClient } = require('../index.js')

test('aborts eventually if server keeps returning 429', async () => {
    const client = new SeatsioClient(new Region('https://httpbin.org'))
    const start = new Date()
    try {
        await client.client.get('/status/429')
        throw new Error('Should have failed')
    } catch (e) {
        expect(e).toBe('get /status/429 resulted in 429 TOO MANY REQUESTS error')
        const waitTime = new Date().getTime() - start.getTime()
        expect(waitTime).toBeGreaterThan(10000)
        expect(waitTime).toBeLessThan(20000)
    }
})

test('aborts directly if server returns error other than 429', async () => {
    const client = new SeatsioClient(new Region('https://httpbin.org'))
    const start = new Date()
    try {
        await client.client.get('/status/400')
        throw new Error('Should have failed')
    } catch (e) {
        expect(e).toBe('get /status/400 resulted in 400 BAD REQUEST error')
        const waitTime = new Date().getTime() - start.getTime()
        expect(waitTime).toBeLessThan(2000)
    }
})

test('aborts directly if server returns 429 but max retries 0', async () => {
    const client = new SeatsioClient(new Region('https://httpbin.org')).setMaxRetries(0)
    const start = new Date()
    try {
        await client.client.get('/status/429')
        throw new Error('Should have failed')
    } catch (e) {
        expect(e).toBe('get /status/429 resulted in 429 TOO MANY REQUESTS error')
        const waitTime = new Date().getTime() - start.getTime()
        expect(waitTime).toBeLessThan(2000)
    }
})

test('returns successfully when the server sends a 429 first, but then a successful response', async () => {
    const client = new SeatsioClient(new Region('https://httpbin.org'))
    for (let i = 0; i < 20; ++i) {
        const response = await client.client.get('/status/429:0.25,204:0.75')
        expect(response.status).toBe(204)
    }
})
