test('should change the password', async () => {
  await client.accounts.changePassword('someNewPassword')
})
