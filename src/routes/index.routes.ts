import express from 'express';

import createUserRouter from './user.routes';

import createLoginRouter from './login.routes';
import createHealthRouter from './health.routes';

class createRouter {
  public static route() {
    const router = express.Router();

    const userRoutesInitialized = createUserRouter.route();

    const loginRoutesInitialized = createLoginRouter.route();

    const healthRoutesInitialzed = createHealthRouter.route();

    router.use('/health', healthRoutesInitialzed);

    router.use('/user', userRoutesInitialized);

    router.use('/auth', loginRoutesInitialized);

    return router;
  }
}

export default createRouter;
