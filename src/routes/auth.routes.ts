import {Express, Request, Response} from 'express';

import * as controller from '../controller/auth.controller';
import checkDuplicatedUsernameOrEmail from '../middleware/sign_up/checkDuplicatedUsernameOrEmail';
import checkRolesExist from '../middleware/sign_up/checkRolesExist';
import isUserVerified from '../middleware/authentication/isUserVerified';

// routes for authentication functions

export default (app: Express) => {
  app.use((req: Request, res: Response, next: Function) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // the signup controller
  app.post(
    '/api/auth/signup',
    [checkDuplicatedUsernameOrEmail, checkRolesExist],
    controller.signup
  );

  // the sign in controller
  app.post('/api/auth/signin', [isUserVerified], controller.signIn);
};
