import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BrowserCommand } from 'vitest/node'

const testsDir = dirname(dirname(fileURLToPath(import.meta.url)))

export const readFixture: BrowserCommand<[string]> = async (_ctx, name) => {
    return readFile(join(testsDir, name), 'utf-8')
}

export const getTestConfig: BrowserCommand<[]> = async () => {
    return {
        baseUrl: process.env.API_URL || 'http://localhost:9001',
        demoCompanySecretKey: process.env.DEMO_COMPANY_SECRET_KEY,
        systemApiSecret: process.env.CORE_V2_STAGING_EU_SYSTEM_API_SECRET || 'superSecretSystemApi'
    }
}
