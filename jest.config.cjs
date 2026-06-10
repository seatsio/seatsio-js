module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
    },
    setupFilesAfterEnv: [
        '<rootDir>/tests/setupTests.ts'
    ]
}
