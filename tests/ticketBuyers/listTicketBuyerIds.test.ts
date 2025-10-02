import { TestUtils } from '../testUtils'

test('can list ticket buyer ids', async () => {
    const { client } = await TestUtils.createTestUserAndClient()

    const ticketBuyerId1 = crypto.randomUUID()
    const ticketBuyerId2 = crypto.randomUUID()
    const ticketBuyerId3 = crypto.randomUUID()

    await client.ticketBuyers.add([ticketBuyerId1, ticketBuyerId2, ticketBuyerId3])

    const ticketBuyerIds: string[] = []
    for await (const id of client.ticketBuyers.listAll()) {
        ticketBuyerIds.push(id)
    }

    expect(ticketBuyerIds).toEqual(expect.arrayContaining([ticketBuyerId1, ticketBuyerId2, ticketBuyerId3]))
})
