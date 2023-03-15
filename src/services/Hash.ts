import { hash as _hash, verify as _verify } from 'argon2';

const argonConfig = Object.freeze({
  hashLength: 40,
  timeCost: 4,
});

class Hash {
  async hash(value: string): Promise<string> {
    return _hash(value, argonConfig);
  }

  async verify(encryptedValue: string, value: string): Promise<boolean> {
    return _verify(encryptedValue, value);
  }
}

export default new Hash();
