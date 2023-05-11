import { Region } from '../src/Region'
// @ts-expect-error TS(7016): Could not find a declaration file for module '../i... Remove this comment to see the full error message
import { SeatsioClient } from '../index.js'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('aborts eventually if server keeps returning 429', async () => {
    const client = new SeatsioClient(new Region('https://httpbin.seatsio.net'))
    const start = new Date()
    try {
        await client.client.get('/status/429')
        throw new Error('Should have failed')
    } catch (e) {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(e).toBe('get /status/429 resulted in 429 Too Many Requests error')
        const waitTime = new Date().getTime() - start.getTime()
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(waitTime).toBeGreaterThan(10000)
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(waitTime).toBeLessThan(20000)
    }
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('aborts directly if server returns error other than 429', async () => {
    const client = new SeatsioClient(new Region('https://httpbin.seatsio.net'))
    const start = new Date()
    try {
        await client.client.get('/status/400')
        throw new Error('Should have failed')
    } catch (e) {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(e).toBe('get /status/400 resulted in 400 Bad Request error')
        const waitTime = new Date().getTime() - start.getTime()
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(waitTime).toBeLessThan(2000)
    }
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('aborts directly if server returns 429 but max retries 0', async () => {
    const client = new SeatsioClient(new Region('https://httpbin.seatsio.net')).setMaxRetries(0)
    const start = new Date()
    try {
        await client.client.get('/status/429')
        throw new Error('Should have failed')
    } catch (e) {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(e).toBe('get /status/429 resulted in 429 Too Many Requests error')
        const waitTime = new Date().getTime() - start.getTime()
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(waitTime).toBeLessThan(2000)
    }
})

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns successfully when the server sends a 429 first, but then a successful response', async () => {
    const client = new SeatsioClient(new Region('https://httpbin.seatsio.net'))
    for (let i = 0; i < 20; ++i) {
        const response = await client.client.get('/status/429:0.25,204:0.75')
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.status).toBe(204)
    }
})
