import { configDefaults, defineConfig } from 'vitest/config'
import { getTestConfig, readFixture } from './tests/support/browserTestUtils.js'

export default defineConfig({
    test: {
        globals: true,
        testTimeout: 60000,
        projects: [
            {
                extends: true,
                test: {
                    name: 'node',
                    environment: 'node',
                    exclude: [...configDefaults.exclude, 'tests/exponentialBackoff.test.ts']
                }
            },
            {
                extends: true,
                test: {
                    name: 'browser',
                    setupFiles: ['./tests/support/browserSetup.ts'],
                    browser: {
                        enabled: true,
                        provider: 'playwright',
                        headless: true,
                        instances: [{ browser: 'chromium' }],
                        commands: { readFixture, getTestConfig }
                    }
                }
            }
        ]
    }
})
