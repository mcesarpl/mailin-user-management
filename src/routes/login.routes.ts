import express from 'express';

import { LoginController } from '@src/controllers/LoginController';

class createLoginRoute {
  public static route() {
    const loginController = new LoginController();

    const router = express.Router();

    router.post('/login', (req, res) => loginController.login(req, res));

    router.post('/logout', (req, res) => loginController.logout(req, res));

    return router;
  }
}

export default createLoginRoute;
