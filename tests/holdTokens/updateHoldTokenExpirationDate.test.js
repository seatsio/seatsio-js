test('should update hold token expiration date', async () => {
  let d = new Date().toISOString()
  let lowerBound = new Date(d)
  let upperBound = new Date(d)
  lowerBound.setMinutes(lowerBound.getMinutes() + 30)
  upperBound.setMinutes(upperBound.getMinutes() + 31)
  let holdToken = await client.holdTokens.create()

  let updatedHoldToken = await client.holdTokens.expiresInMinutes(holdToken.holdToken, 30)

  expect(updatedHoldToken.holdToken).toBe(holdToken.holdToken)
  expect(lowerBound.getTime() <= updatedHoldToken.expiresAt.getTime()).toBe(true)
  expect(updatedHoldToken.expiresAt.getTime() <= upperBound.getTime()).toBe(true)
  expect(updatedHoldToken.expiresInSeconds).toBeGreaterThanOrEqual(29 * 60)
  expect(updatedHoldToken.expiresInSeconds).toBeLessThanOrEqual(30 * 60)
})
