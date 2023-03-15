import express from 'express';

import { UserController } from '@src/controllers/UserController';
import VerifyAuthentication from '@src/helper/VerifyAuthentication';
import { VerifyAuthorization } from '@src/helper/VerifyAuthorization';

class createUserRouter {
  public static route() {
    const userController = new UserController();
    const verifyAuthorization = new VerifyAuthorization();

    const router = express.Router();

    router.get('/', VerifyAuthentication.verify, (req, res) =>
      userController.find(req, res),
    );

    router.get('/:_id', VerifyAuthentication.verify, (req, res) =>
      userController.findOne(req, res),
    );

    router.post('/create', (req, res) => userController.create(req, res));

    router.put(
      '/update',
      VerifyAuthentication.verify,
      (req, res, next) => verifyAuthorization.isAccountOwner(req, res, next),
      (req, res) => userController.update(req, res),
    );

    router.delete(
      '/delete/:_id',
      VerifyAuthentication.verify,
      (req, res, next) => verifyAuthorization.isAccountOwner(req, res, next),
      (req, res) => userController.softDelete(req, res),
    );

    router.delete(
      '/hard-delete/:_id',
      VerifyAuthentication.verify,
      (req, res, next) => verifyAuthorization.isRoot(req, res, next),
      (req, res) => userController.delete(req, res),
    );

    return router;
  }
}

export default createUserRouter;
