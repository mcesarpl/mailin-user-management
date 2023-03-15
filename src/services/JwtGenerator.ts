import jwt from 'jsonwebtoken';
import config from 'config';

class JwtGenerator {
  generate(input: string): string {
    const jwtSecret = config.get<string>('App.jwtSecret');

    const token = jwt.sign(input, jwtSecret);

    return token;
  }

  verify(token: string): boolean {
    const jwtSecret = config.get<string>('App.jwtSecret');

    try {
      jwt.verify(token, jwtSecret);
    } catch (err) {
      return false;
    }

    return true;
  }

  retrieve(token: string): string {
    const jwtSecret = config.get<string>('App.jwtSecret');

    try {
      return String(jwt.verify(token, jwtSecret));
    } catch (err) {
      return '';
    }
  }
}

export default new JwtGenerator();
