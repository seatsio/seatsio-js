import { TestUtils } from '../testUtils'
import { v4 as randomUuid } from 'uuid'

test('can remove ticket buyer ids', async () => {
    const { client } = await TestUtils.createTestUserAndClient()

    const ticketBuyerId1 = randomUuid()
    const ticketBuyerId2 = randomUuid()
    const ticketBuyerId3 = randomUuid()

    await client.ticketBuyers.add([ticketBuyerId1, ticketBuyerId2])

    const response = await client.ticketBuyers.remove([ticketBuyerId1, ticketBuyerId2, ticketBuyerId3])

    expect(response.removed).toEqual(expect.arrayContaining([ticketBuyerId1, ticketBuyerId2]))
    expect(response.notPresent).toEqual([ticketBuyerId3])
})

test('null does not get removed', async () => {
    const { client } = await TestUtils.createTestUserAndClient()

    const ticketBuyerId1 = randomUuid()
    const ticketBuyerId2 = randomUuid()
    const ticketBuyerId3 = randomUuid()

    await client.ticketBuyers.add([ticketBuyerId1, ticketBuyerId2, ticketBuyerId3])

    // @ts-ignore
    const response = await client.ticketBuyers.remove([ticketBuyerId1, null])

    expect(response.removed).toEqual([ticketBuyerId1])
    expect(response.notPresent).toEqual([])
})
