import ServerFactory from './factories/ServerFactory';
import { InitEnvt } from './services';

InitEnvt.init();

const server = ServerFactory.create();

server.init().then(() => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
