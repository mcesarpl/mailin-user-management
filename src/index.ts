import { InitEnv, StartServer } from './services';

InitEnv.init();

const starter = new StartServer();

starter.start();
