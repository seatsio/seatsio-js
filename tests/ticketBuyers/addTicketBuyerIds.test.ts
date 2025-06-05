import { TestUtils } from '../testUtils'
import { v4 as randomUuid } from 'uuid'

test('can add ticket buyer ids', async () => {
    const { client } = await TestUtils.createTestUserAndClient()

    const ticketBuyerId1 = randomUuid()
    const ticketBuyerId2 = randomUuid()
    const ticketBuyerId3 = randomUuid()

    const response = await client.ticketBuyers.add([ticketBuyerId1, ticketBuyerId2, ticketBuyerId3])

    expect(response.added).toEqual(expect.arrayContaining([ticketBuyerId1, ticketBuyerId2, ticketBuyerId3]))
    expect(response.alreadyPresent).toEqual([])
})

test('can add ticket buyer ids with duplicates', async () => {
    const { client } = await TestUtils.createTestUserAndClient()

    const ticketBuyerId1 = randomUuid()
    const ticketBuyerId2 = randomUuid()

    const response = await client.ticketBuyers.add([
        ticketBuyerId1, ticketBuyerId1, ticketBuyerId1,
        ticketBuyerId2, ticketBuyerId2
    ])

    expect(response.added).toEqual(expect.arrayContaining([ticketBuyerId1, ticketBuyerId2]))
    expect(response.alreadyPresent).toEqual([])
})

test('same id does not get added twice', async () => {
    const { client } = await TestUtils.createTestUserAndClient()

    const ticketBuyerId1 = randomUuid()
    const ticketBuyerId2 = randomUuid()

    const firstResponse = await client.ticketBuyers.add([ticketBuyerId1, ticketBuyerId2])

    expect(firstResponse.added).toEqual(expect.arrayContaining([ticketBuyerId1, ticketBuyerId2]))
    expect(firstResponse.alreadyPresent).toEqual([])

    const secondResponse = await client.ticketBuyers.add([ticketBuyerId1])

    expect(secondResponse.alreadyPresent).toEqual([ticketBuyerId1])
})
