import { TestUtils } from '../testUtils'
import { v4 as randomUuid } from 'uuid'

test('can list ticket buyer ids', async () => {
    const { client } = await TestUtils.createTestUserAndClient()

    const ticketBuyerId1 = randomUuid()
    const ticketBuyerId2 = randomUuid()
    const ticketBuyerId3 = randomUuid()

    await client.ticketBuyers.add([ticketBuyerId1, ticketBuyerId2, ticketBuyerId3])

    const ticketBuyerIds: string[] = []
    for await (const id of client.ticketBuyers.listAll()) {
        ticketBuyerIds.push(id)
    }

    expect(ticketBuyerIds).toEqual(expect.arrayContaining([ticketBuyerId1, ticketBuyerId2, ticketBuyerId3]))
})
