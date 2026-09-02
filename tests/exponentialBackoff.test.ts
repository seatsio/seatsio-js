import http from 'http'
import { AddressInfo } from 'net'
import { Region } from '../src/Region.js'
import { SeatsioClient } from '../src/SeatsioClient.js'

type Handler = (req: http.IncomingMessage, res: http.ServerResponse) => void

interface TestServer {
    url: string
    close: () => Promise<void>
}

function startTestServer (handler: Handler) {
    const server = http.createServer((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'authorization,x-client-lib')
        if (req.method === 'OPTIONS') {
            res.writeHead(204)
            res.end()
            return
        }
        handler(req, res)
    })
    return new Promise<TestServer>((resolve, reject) => {
        const onStartupError = (err: Error) => reject(err)
        server.once('error', onStartupError)
        server.listen(0, '127.0.0.1', () => {
            server.removeListener('error', onStartupError)
            server.on('error', err => console.error('Test server error:', err))
            const { port } = server.address() as AddressInfo
            resolve({
                url: `http://127.0.0.1:${port}`,
                close: () => new Promise<void>(resolve => server.close(() => resolve()))
            })
        })
    })
}

function alwaysRespond (status: number): Handler {
    return (_req, res) => {
        res.writeHead(status)
        res.end()
    }
}

function respondWithPattern (pattern: number[]): Handler {
    let index = 0
    return (_req, res) => {
        res.writeHead(pattern[index % pattern.length])
        index++
        res.end()
    }
}

test('aborts eventually if server keeps returning 429', async () => {
    const { url, close } = await startTestServer(alwaysRespond(429))
    try {
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
    } finally {
        await close()
    }
})

test('aborts directly if server returns error other than 429', async () => {
    const { url, close } = await startTestServer(alwaysRespond(400))
    try {
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
    } finally {
        await close()
    }
})

test('aborts directly if server returns 429 but max retries 0', async () => {
    const { url, close } = await startTestServer(alwaysRespond(429))
    try {
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
    } finally {
        await close()
    }
})

test('returns successfully when the server sends a 429 first, but then a successful response', async () => {
    const { url, close } = await startTestServer(respondWithPattern([429, 204, 204, 204]))
    try {
        const client = new SeatsioClient(new Region(url), '')
        for (let i = 0; i < 20; ++i) {
            const response = await client.client.get('/status/429-then-204')
            expect(response.status).toBe(204)
        }
    } finally {
        await close()
    }
})
