import express from 'express';

import createUserRouter from './user.routes';

import createLoginRouter from './login.routes';

class createRouter {
  public static route() {
    const router = express.Router();

    router.get('/', (_, res) => {
      res.status(200).json({ message: 'Mailin Accounts listening...' });
    });

    const userRoutesInitialized = createUserRouter.route();

    const loginRoutesInitialized = createLoginRouter.route();

    router.use('/user', userRoutesInitialized);

    router.use('/auth', loginRoutesInitialized);

    return router;
  }
}

export default createRouter;
