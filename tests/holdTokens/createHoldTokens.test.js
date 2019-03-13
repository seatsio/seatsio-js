test('should create hold tokens', async () => {
  let now = new Date().getTime()
  let holdToken = await client.holdTokens.create()

  expect(holdToken.expiresAt instanceof Date).toBe(true)
  expect(holdToken.expiresAt.getTime()).toBeLessThanOrEqual((now + (60000 * 15)) + 1000)
  expect(holdToken.expiresAt.getTime()).toBeGreaterThanOrEqual(now)
  expect(holdToken.holdToken).toBeTruthy()
})

test('should create hold token that expires in 1 minute', async () => {
  let holdToken = await client.holdTokens.create(1)

  expect(holdToken.expiresAt instanceof Date).toBe(true)
  expect(holdToken.holdToken).toBeTruthy()
  expect(holdToken.expiresInSeconds).toBeLessThanOrEqual(60)
})
