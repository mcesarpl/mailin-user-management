import TokenGenerator from '@src/services/TokenGenerator';

describe('Token Generator test', () => {
  it('Should import not to be undefined', () => {
    expect(TokenGenerator).not.toBeUndefined();
  });

  it('Should generate a token with 24 bytes', () => {
    const token = TokenGenerator.generateToken();

    expect(token).toHaveLength(24);
  });
});
