test('should retrieve hold tokens', async () => {
    let holdToken = await client.holdTokens.create();

    let retrievedToken = await client.holdTokens.retrieve(holdToken.holdToken);

    expect(retrievedToken.holdToken).toBe(holdToken.holdToken);
    expect(retrievedToken.expiresAt).toEqual(holdToken.expiresAt);
    expect(retrievedToken.expiresAt instanceof Date).toBe(true);
    expect(holdToken.expiresInSeconds).toBeGreaterThanOrEqual(14 * 60);
    expect(holdToken.expiresInSeconds).toBeLessThanOrEqual(15 * 60);
});
