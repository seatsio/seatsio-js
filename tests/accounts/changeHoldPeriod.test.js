test('should change the holdPeriod', async () => {
  await client.accounts.changeHoldPeriod(14)

  let account = await client.accounts.retrieveMyAccount()
  expect(account.settings.holdPeriodInMinutes).toBe(14)
})
