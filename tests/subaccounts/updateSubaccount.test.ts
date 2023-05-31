import { TestUtils } from '../testUtils'

test('should update subaccount', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create('joske')

    await client.subaccounts.update(subaccount.id, 'jefke')

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.name).toBe('jefke')
})

test('name is not changed when updating with name=null', async () => {
    const { client } = await TestUtils.createTestUserAndClient()
    const subaccount = await client.subaccounts.create('joske')

    await client.subaccounts.update(subaccount.id, null)

    const retrievedSubaccount = await client.subaccounts.retrieve(subaccount.id)
    expect(retrievedSubaccount.name).toBe('joske')
})
