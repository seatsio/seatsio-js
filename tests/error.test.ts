import { TestUtils } from './testUtils'

test('check error handling', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    expect.assertions(4)
    try {
        await client.events.create('unexisting chart')
    } catch (e: any) {
        expect(e.errors.length).toEqual(1)
        expect(e.errors[0].code).toBe('CHART_NOT_FOUND')
        expect(e.errors[0].message).toContain('Chart not found: unexisting chart was not found in workspace')
        expect(e.messages[0]).toContain('Chart not found: unexisting chart was not found in workspace')
    }
})
