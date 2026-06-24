import { Month } from '../../src/Common/Month.js'

test('months with a single digit should be padded with a leading zero', () => {
    expect(new Month(2022, 1).toString()).toBe('2022-01')
})

test('months with a double digit should not be padded with a leading zero', () => {
    expect(new Month(2022, 10).toString()).toBe('2022-10')
})
