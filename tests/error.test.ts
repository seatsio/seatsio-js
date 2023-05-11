// @ts-expect-error TS(1149): File name '/Users/bver/Development/work/seatsio/se... Remove this comment to see the full error message
import { TestUtils } from './testUtils'

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('check error handling', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect.assertions(1)
    const errorSnapshot = {
        status: 400,
        messages: ['#: required key [chartKey] not found'],
        errors:
        [{
            code: 'GENERAL_ERROR',
            message: '#: required key [chartKey] not found'
        }],
        warnings: []
    }

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    await expect(client.events.create()).rejects.toMatchObject(errorSnapshot)
})
