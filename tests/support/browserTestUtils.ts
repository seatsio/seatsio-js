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
        usageReportingTestsApiUrl: process.env.USAGE_REPORTING_TESTS_API_URL,
        usageReportingTestsSecretKey: process.env.USAGE_REPORTING_TESTS_SECRET_KEY,
        systemApiSecret: process.env.CORE_V2_API_SECRET || 'superSecretSystemApi',
        httpbinUrl: process.env.HTTPBIN_URL || 'https://httpbingo.org'
    }
}
