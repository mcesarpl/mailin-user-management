import { ExpressApp } from '@src/services';

export class ServerFactory {
  public static create() {
    return new ExpressApp();
  }
}
