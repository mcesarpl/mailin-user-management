import { ExpressApp } from '@src/services';

class ServerFactory {
  public static create() {
    return new ExpressApp();
  }
}

export default ServerFactory;
