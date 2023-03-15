import JwtGenerator from '@src/services/JwtGenerator';

describe('Jwt Generator test', () => {
  const testString = 'testUsername';

  it('Should import not to be undefined', () => {
    expect(JwtGenerator).not.toBeUndefined();
  });

  it('Should generate a jwt', async () => {
    const token = JwtGenerator.generate(testString);

    expect(token && typeof token === 'string').toBe(true);

    expect(token && token.length > 0).toBe(true);
  });

  it('Should verify a valid jwt', async () => {
    const token = JwtGenerator.generate(testString);

    const result = JwtGenerator.verify(token);

    expect(result).toBe(true);
  });

  it('Should verify a invalid jwt', async () => {
    const token = `h234d8uhd.${testString}.da8d8nsd8as746n`;

    const result = JwtGenerator.verify(token);

    expect(result).toBe(false);
  });
});
