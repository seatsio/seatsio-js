test('should create hold tokens', async () => {
    let holdToken = await client.holdTokens.create();

    expect(holdToken.expiresAt instanceof Date).toBe(true);
    expect(holdToken.holdToken).toBeTruthy();
});
