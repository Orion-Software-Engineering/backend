import {NextFunction, Request, Response, Express} from 'express';
import {authJwt} from '../middleware/authJwt';

import * as controller from '../controller/user.controller';

// routes for user functions

export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/test/all', controller.allAccess);

    app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

    app.get(
        '/api/test/mod',
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        '/api/test/admin',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        '/api/test/users',
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.showAll
    );
};
