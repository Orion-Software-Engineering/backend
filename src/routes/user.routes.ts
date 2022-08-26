import {NextFunction, Request, Response, Express} from 'express';

import * as controller from '../controller/user.controller';
import * as matchController from '../controller/match.controller';
import verifyToken from '../middleware/authentication/verifyToken';
import isModerator from '../middleware/authentication/isModerator';
import isAdmin from '../middleware/authentication/isAdmin';

// routes for user functions

export default (app: Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/user/:userId',
        controller.getUsername)

    app.get('/api/user/profile/:userId',
        controller.getUserProfile)

    app.get('/api/test/all', controller.allAccess);

    app.get('/api/test/user',
        [verifyToken],
        controller.userBoard);

    app.get(
        '/api/test/mod',
        [verifyToken, isModerator],
        controller.moderatorBoard
    );

    app.get('/api/test/all', controller.allAccess);


    app.get('/api/test/admin', [verifyToken, isAdmin], controller.adminBoard);

    // TODO: id param should be removed and verifyToke6n6 6m6iddleware should be inclueded
    app.get('/api/test/matches/:id', matchController.find);

    app.get(
        '/api/test/users',
        // [verifyToken, isAdmin],
        controller.showAll
    );
};
