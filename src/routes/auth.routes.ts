import {Express, NextFunction, Request, Response} from 'express';

import {verifySignUp} from '../middleware/verifySignUp';

import * as controller from '../controller/auth.controller';

// routes for authentication functions

export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    // the signup controller
    app.post(
        '/api/auth/signup',
        [
            verifySignUp.checkDuplicatedUsernameOrEmail,
            verifySignUp.checkRolesExisted,
        ],
        controller.signup
    );

    // the sign in controller
    app.post('/api/auth/signin', controller.signin);
};
