import { randomUUID } from 'crypto'
import http from 'http'
import { AddressInfo } from 'net'
import { BrowserCommand } from 'vitest/node'

export type ServerSpec =
    | { type: 'always'; status: number }
    | { type: 'pattern'; statuses: number[] }

const servers = new Map<string, http.Server>()

function handlerFor (spec: ServerSpec): http.RequestListener {
    let index = 0
    return (_req, res) => {
        const status = spec.type === 'always' ? spec.status : spec.statuses[index++ % spec.statuses.length]
        res.writeHead(status)
        res.end()
    }
}

export const startTestServer: BrowserCommand<[ServerSpec]> = async (_ctx, spec) => {
    const handler = handlerFor(spec)
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

    await new Promise<void>((resolve, reject) => {
        const onStartupError = (err: Error) => reject(err)
        server.once('error', onStartupError)
        server.listen(0, '127.0.0.1', () => {
            server.removeListener('error', onStartupError)
            server.on('error', err => console.error('Test server error:', err))
            resolve()
        })
    })

    const { port } = server.address() as AddressInfo
    const id = randomUUID()
    servers.set(id, server)
    return { id, url: `http://127.0.0.1:${port}` }
}

export const closeTestServer: BrowserCommand<[string]> = async (_ctx, id) => {
    const server = servers.get(id)
    if (!server) {
        return
    }
    servers.delete(id)
    await new Promise<void>(resolve => server.close(() => resolve()))
}
