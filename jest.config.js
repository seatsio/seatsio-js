module.exports = {
    preset: 'ts-jest',
    transform: {},
    testEnvironment: 'node',
    setupFilesAfterEnv: [
        '<rootDir>/tests/setupTests.ts'
    ]
}
