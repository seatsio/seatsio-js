export const isBrowser = typeof document !== 'undefined'

interface TestConfig {
    baseUrl: string
    demoCompanySecretKey?: string
    systemApiSecret: string
}

declare module '@vitest/browser/context' {
    // eslint-disable-next-line no-unused-vars
    interface BrowserCommands {
        readFixture: (name: string) => Promise<string>
        getTestConfig: () => Promise<TestConfig>
    }
}

let config: TestConfig | undefined

export function getConfig (): TestConfig {
    if (!config) {
        if (isBrowser) {
            throw new Error('Test config not initialized yet — initTestEnvironment() must run in a setupFile before tests execute')
        }
        config = {
            baseUrl: process.env.API_URL || 'http://localhost:9001',
            demoCompanySecretKey: process.env.DEMO_COMPANY_SECRET_KEY,
            systemApiSecret: process.env.CORE_V2_STAGING_EU_SYSTEM_API_SECRET || 'superSecretSystemApi'
        }
    }
    return config
}

export async function initTestEnvironment (): Promise<void> {
    const { commands } = await import('@vitest/browser/context')
    config = await commands.getTestConfig()
}

export async function readFixture (name: string): Promise<string> {
    if (isBrowser) {
        const { commands } = await import('@vitest/browser/context')
        return commands.readFixture(name)
    }
    const { readFile } = await import('node:fs/promises')
    const { dirname, join } = await import('node:path')
    const { fileURLToPath } = await import('node:url')
    const testsDir = dirname(dirname(fileURLToPath(import.meta.url)))
    return readFile(join(testsDir, name), 'utf-8')
}
