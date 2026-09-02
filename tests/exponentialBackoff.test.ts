import { commands } from '@vitest/browser/context'
import { Region } from '../src/Region.js'
import { SeatsioClient } from '../src/SeatsioClient.js'
import { ServerSpec } from './support/browserTestServer.js'

declare module '@vitest/browser/context' {
    // eslint-disable-next-line no-unused-vars
    interface BrowserCommands {
        startTestServer: (spec: ServerSpec) => Promise<{ id: string, url: string }>
        closeTestServer: (id: string) => Promise<void>
    }
}

async function withTestServer<T> (spec: ServerSpec, fn: (url: string) => Promise<T>): Promise<T> {
    const { id, url } = await commands.startTestServer(spec)
    try {
        return await fn(url)
    } finally {
        await commands.closeTestServer(id)
    }
}

test('aborts eventually if server keeps returning 429', async () => {
    await withTestServer({ type: 'always', status: 429 }, async (url) => {
        const client = new SeatsioClient(new Region(url), 'someSecretKey')
        const start = new Date()
        try {
            await client.client.get('/status/429')
            throw new Error('Should have failed')
        } catch (e) {
            expect(e).toBe('get /status/429 resulted in 429 Too Many Requests error')
            const waitTime = new Date().getTime() - start.getTime()
            expect(waitTime).toBeGreaterThan(10000)
            expect(waitTime).toBeLessThan(25000)
        }
    })
})

test('aborts directly if server returns error other than 429', async () => {
    await withTestServer({ type: 'always', status: 400 }, async (url) => {
        const client = new SeatsioClient(new Region(url), '')
        const start = new Date()
        try {
            await client.client.get('/status/400')
            throw new Error('Should have failed')
        } catch (e) {
            expect(e).toBe('get /status/400 resulted in 400 Bad Request error')
            const waitTime = new Date().getTime() - start.getTime()
            expect(waitTime).toBeLessThan(2000)
        }
    })
})

test('aborts directly if server returns 429 but max retries 0', async () => {
    await withTestServer({ type: 'always', status: 429 }, async (url) => {
        const client = new SeatsioClient(new Region(url), '').setMaxRetries(0)
        const start = new Date()
        try {
            await client.client.get('/status/429')
            throw new Error('Should have failed')
        } catch (e) {
            expect(e).toBe('get /status/429 resulted in 429 Too Many Requests error')
            const waitTime = new Date().getTime() - start.getTime()
            expect(waitTime).toBeLessThan(2000)
        }
    })
})

test('returns successfully when the server sends a 429 first, but then a successful response', async () => {
    await withTestServer({ type: 'pattern', statuses: [429, 204, 204, 204] }, async (url) => {
        const client = new SeatsioClient(new Region(url), '')
        for (let i = 0; i < 20; ++i) {
            const response = await client.client.get('/status/429-then-204')
            expect(response.status).toBe(204)
        }
    })
})
